import { PreviewArticle } from '../../../Components';

import Styled from './Body.styled';

const Community = ({
  famousArticles,
  freeArticles,
  anonyArticles,
  moveArticles,
  navi,
}) => {
  return (
    <>
      <Styled.StyledList
        disablePadding="true"
        component="nav"
        aria-label="mailbox folders"
      >
        {/* famousArticles 대신 freeArticles로 */}
        {freeArticles &&
          freeArticles.slice(0, 3).map(article => {
            return (
              <PreviewArticle
                id={article.id}
                article={article}
                onClickArticle={() => moveArticles(article.id)}
              />
              // 인기글 가져오기, 지금은 보류.
            );
          })}
      </Styled.StyledList>

      <Styled.ListDivider margin="0.4rem" />
      <Styled.StyledList
        disablePadding="true"
        component="nav"
        aria-label="mailbox folders"
      >
        <Styled.BoardTitleDiv
          className="article"
          onClick={() => navi('/category/1')}
          boardArticleCount={freeArticles.length}
        >
          <div className="board_name">자유게시판</div>
          <div className="board_count"></div>
        </Styled.BoardTitleDiv>

        {freeArticles &&
          freeArticles.slice(0, 3).map(article => {
            return (
              <PreviewArticle
                id={article.id}
                article={article}
                onClickArticle={() => moveArticles(article.id)}
              />
            );
          })}
      </Styled.StyledList>

      <Styled.ListDivider margin="0.4rem" />
      <Styled.StyledList
        disablePadding="true"
        component="nav"
        aria-label="mailbox folders"
      >
        <Styled.BoardTitleDiv
          className="article"
          onClick={() => navi('/category/2')}
          boardArticleCount={anonyArticles.length}
        >
          <div className="board_name">익명게시판</div>
          <div className="board_count"></div>
        </Styled.BoardTitleDiv>

        {anonyArticles &&
          anonyArticles.slice(0, 3).map(article => {
            return (
              <PreviewArticle
                id={article.id}
                article={article}
                onClickArticle={() => moveArticles(article.id)}
              />
            );
          })}
      </Styled.StyledList>
    </>
  );
};

export default Community;
