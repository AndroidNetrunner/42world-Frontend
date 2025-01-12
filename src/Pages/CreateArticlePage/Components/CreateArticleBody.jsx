import { useState, useEffect } from 'react';
import { getCategoryByUrl } from '../../../Utils';
import { useLocation, useNavigate } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import ArticleService from '../../../Network/ArticleService';

import LoadingButton from '@mui/lab/LoadingButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GlobalStyled from '../../../Styled/Global.styled';

const CreateArticleBody = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [curCate, setCurCate] = useState('');
  const [isSending, setIsSending] = useState(false);

  const loca = useLocation();
  const navi = useNavigate();
  const pathArray = loca.pathname.split('/');

  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };

  const handleChangeContent = e => {
    setContent(e.target.value);
  };

  const handleClickCancel = () => {
    navi(-1);
  };

  const handleClickSubmit = async () => {
    if (title === '') {
      alert('제목을 입력하세요!');
      return;
    }
    if (content === '') {
      alert('내용을 입력하세요!');
      return;
    }
    // 이동한 뒤에 API 실행됨
    setIsSending(true);
    const result = await ArticleService.createArticles({
      title: title,
      content: content,
      categoryId: +pathArray[2], // + 붙이면 number 타입
    });
    setIsSending(false);
    navi(-1);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    handleClickSubmit();
  };

  useEffect(() => {
    setCurCate(getCategoryByUrl(loca));
  }, [loca]);
  return (
    <>
      <div className="header">
        <div>
          <ArrowBackIcon onClick={handleClickCancel} />
        </div>
        <div>
          <span>글 작성하기</span>
        </div>
        <div>
          <LoadingButton
            loading={isSending}
            onClick={handleClickSubmit}
            variant="outlined"
            className="submit_button"
          >
            완료
          </LoadingButton>
        </div>
      </div>
      <div className="body">
        <GlobalStyled.BoardTitleDiv>
          <div className="board_name">{curCate}</div>
        </GlobalStyled.BoardTitleDiv>
        <form onSubmit={handleFormSubmit}>
          <input
            placeholder="제목을 입력하세요"
            onChange={handleChangeTitle}
            maxLength={30}
          />
          <TextareaAutosize
            placeholder="내용을 입력하세요"
            onChange={handleChangeContent}
            maxLength={4200}
          />
          <p>{content.length}/4200</p>
        </form>
      </div>
    </>
  );
};

export default CreateArticleBody;
