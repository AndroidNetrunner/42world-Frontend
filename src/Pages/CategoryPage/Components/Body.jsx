import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArticleService from '../../../Network/ArticleService_old';
import { PreviewArticle } from '../../../Components';
import { getCurCategory } from '../../../Utils';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import CreateIcon from '@mui/icons-material/Create';
import Fab from '@mui/material/Fab';

import Styled from './Body.styled';

const Body = () => {
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [target, setTarget] = useState(null);
  const [curCate, setCurCate] = useState('');
  const loca = useLocation();
  const navi = useNavigate();
  const mockupData = ArticleService;
  const handleClickWrite = () => {
    navi(`${loca.pathname}/create`);
  };

  const handleClickArticles = id => {
    navi(`/article/${id}`);
  };

  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // 실제 API 통신처럼 비동기로 받아오는 것을 구현하기 위해 1.5 초 뒤에 데이터를 갱신한다.
    // resolve, reject는 각각 성공 시, 실패 시의 동작을 의미. reject를 생략하니 reslove의 경우만 익명함수로 처리해주었다.
    const newData = mockupData.fetchAllArticle();
    setArticles(prevList => prevList.concat(newData));
    setIsLoaded(false);
  };
  const onIntersect = async ([entry], observer) => {
    console.log('entry :', entry); // 더 보이거나 덜 보이게 되면서 통과한 역치를 나타내는, IntersectionObserverEntry (en-US) 객체의 배열.
    console.log('observer : ', observer); // 자신을 호출한 IntersectionObserver.
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    setArticles(mockupData.fetchAllArticle());
    setCurCate(getCurCategory(loca));
  }, []);

  useEffect(() => {
    let observer;
    if (target) {
      console.log('target :', target);
      observer = new IntersectionObserver(onIntersect, {
        // ref 역할의 state가 존재한다면 intersection Observer 객체를 observer에 담는다.
        threshold: 0.4,
      });
      observer.observe(target); // observer가 해당 객체를 감시하여 변경된다면 onIntersect 콜백 함수를 실행할 것이다.
    }
    // return () => observer && observer.disconnect(); // 주석 씌워도 잘 돌아가네?
  }, [target]);

  return (
    <>
      <Styled.StyledList component="nav" aria-label="mailbox folders">
        <Styled.BoardTitleDiv>
          <div className="board_name">{curCate}</div>
        </Styled.BoardTitleDiv>

        {articles.map(article => {
          return (
            <PreviewArticle
              article={article}
              onClickArticle={() => handleClickArticles(article.id)}
            />
          );
        })}

        <div ref={setTarget} className="scroll_loading_progress">
          {isLoaded && <CircularProgress />}
        </div>

        <Fab className="fab_button" onClick={handleClickWrite}>
          <CreateIcon />{' '}
        </Fab>
      </Styled.StyledList>
    </>
  );
};

export default Body;