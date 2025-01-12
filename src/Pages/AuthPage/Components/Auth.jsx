import { useContext, useEffect, useState, useMemo } from 'react';
import Styled from './Auth.styled';
import FtAuthService from '../../../Network/FtAuthService';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../App';

const AuthRequestInformation = ({ intraId }) => {
  return (
    <div className="send_info">
      <div>
        <h2>{intraId}@student.42seoul.kr</h2>
        <h3>으로 인증메일이 전송되었습니다.</h3>
      </div>
      <div>
        <h3>받으신 이메일을 열어 ‘인증하기’ </h3>
        <h3>버튼을 클릭하면 인증이 완료됩니다.</h3>
      </div>
    </div>
  );
};

const AuthRequestCheckStep = ({ handleSendReset }) => {
  return (
    <div className="error_info">
      <h4>혹시 메일을 받지 못하셨나요?</h4>
      <h4>1. 전송에 최대 5분이 소요될 수 있습니다.</h4>
      <h4>2. 스팸편지함을 확인해주세요.</h4>
      <h4>3. 인트라 아이디에 오타가 없는지 확인해주세요.</h4>
      <button onClick={handleSendReset}>인트라 아이디 다시 입력하기</button>
    </div>
  );
};

function checkIntraId(str) {
  const regExp = /[A-Za-z0-9-]/g;
  if (regExp.test(str)) {
    return true;
  } else {
    return false;
  }
}

const Auth = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isSend, setIsSend] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState({
    text: '',
  });
  const [input, setInput] = useState({
    email: '',
  });
  const [authInfo, setAuthInfo] = useState({
    email: '',
  });
  let saveId;

  const onChange = e => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleAuthenticate = () => {
    if (input.email === '' || !checkIntraId(input.email)) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1000);
      return;
    }

    FtAuthService.createFtAuth(input.email);
    setIsBlock(true);
    setIsSend(true);
    setAuthInfo({
      email: input.email,
    });
    // setTimeout(() => {
    //   setIsBlock(false);
    // }, 3000);
  };
  const handleSendReset = () => {
    setIsBlock(false);
    setIsSend(false);
    setInput({
      email: '',
    });
  };

  const handleMessage = () => {
    let intervalId = setInterval(() => {
      setLoadingMessage(prevState => ({ text: prevState.text + '.' }));
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  };

  const errorMessage = useMemo(() => {
    if (input.email === '') return '아이디를 입력하세요';
    else return '영어/숫자/특수문자만 가능합니다';
  }, [input.email]);

  useEffect(() => {
    if (isBlock) handleMessage();
    else {
      setLoadingMessage({ text: '메일 전송 중' });
    }
  }, [isBlock]);

  useEffect(() => {
    if (auth.state === 200) navigate('/');
  }, []);

  return (
    <Styled.AuthDiv>
      <div className="input_div">
        <Styled.Input
          className={input}
          name="email"
          error={isError}
          value={input.email}
          onChange={onChange}
          id="filled-error-helper-text"
          label="Intra ID"
          variant="outlined"
        />
        <p className="domain">@student.42seoul.kr</p>
        <Styled.ErrorSpan isError={isError}>{errorMessage}</Styled.ErrorSpan>
      </div>
      <LoadingButton
        className="send_button"
        onClick={handleAuthenticate}
        loading={isBlock}
        loadingIndicator={loadingMessage.text}
        variant="contained"
        disabled={isBlock}
      >
        인증메일 전송하기
      </LoadingButton>
      {isSend && <AuthRequestInformation intraId={authInfo.email} />}
      {isSend && <AuthRequestCheckStep handleSendReset={handleSendReset} />}
    </Styled.AuthDiv>
  );
};

export default Auth;
