import { useEffect, useRef, useState } from 'react';

import Fab from '@mui/material/Fab';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

import ArticleService from '../../../Network/ArticleService';
import CommentService from '../../../Network/CommentService';
import { FavoriteBorder, SmsOutlined } from '@mui/icons-material';
import Styled from '../ArticlePage.styled';
import dayjs from 'dayjs';

const Comment = ({ articleId }) => {
  const lastComment = useRef();
  const [comments, setComments] = useState([]);

  const handleCreateComment = newComment => {
    setComments(prev => prev.concat(newComment));
    lastComment.current.scrollIntoView();
    fetchComment();
  };

  const fetchComment = async () => {
    const res = await ArticleService.getArticlesCommentsById(articleId);
    setComments(res?.data || []);
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const getArticleTime = time =>
    dayjs(time).isSame(dayjs(), 'day')
      ? dayjs(time).format('HH:mm')
      : dayjs(time).format('MM/DD');

  return (
    <div className="comment_list_div">
      <Styled.ArticleCommentDiv
        className="comment_count"
        commentCount={comments?.length}
      >
        <SmsOutlined />
      </Styled.ArticleCommentDiv>
      {comments &&
        comments.map(comment => (
          <>
            <div className="comment_div" key={comment?.id}>
              <div className="info">
                <Styled.ProfileImage width="2.4rem" imagePath="" />
                <div className="picture"></div>
                <div className="text">
                  <h1>{comment?.writer?.nickname}</h1>
                  <h2>{getArticleTime(comment?.updatedAt)}</h2>
                </div>
              </div>
              <Styled.CommentContent
                className="content"
                liked_count={comment?.liked_count}
              >
                <div className="text">{comment.content}</div>
                <span className="liked_count">
                  <FavoriteBorder />
                </span>
              </Styled.CommentContent>
            </div>
          </>
        ))}

      <Styled.CreateCommentDiv>
        <CreateComment
          articleId={articleId}
          handleCreateComment={handleCreateComment}
        />
      </Styled.CreateCommentDiv>
      <div ref={lastComment}></div>
    </div>
  );
};

const CreateComment = ({ articleId, handleCreateComment }) => {
  const [input, setInput] = useState('');
  const handleChange = e => {
    if (e.target.value.length < 420) {
      setInput(e.target.value);
    }
  };
  const handleClickSubmit = async e => {
    e.preventDefault();
    if (input === '') {
      return;
    }

    const res = await CommentService.createComments({
      content: input,
      articleId: +articleId,
    });
    if (res) {
      handleCreateComment(res);
      setInput('');
    }
  };
  return (
    <form onSubmit={handleClickSubmit}>
      <input
        value={input}
        onChange={handleChange}
        placeholder="댓글을 입력하세요"
      />
      <Fab className="fab_button" type="submit">
        <ArrowUpwardRoundedIcon />
      </Fab>
    </form>
  );
};

export default Comment;
