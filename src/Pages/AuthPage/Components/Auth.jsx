import { useEffect, useState } from 'react';
import Styled from './Auth.styled';
import FtAuthService from '../../../Network/FtAuthService';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const authRequestInformation = intraId => {
  return (
    <>
      <div>
        <h2>{intraId}@student.42seoul.kr</h2>
        <h3>으로 인증메일이 전송되었습니다.</h3>
      </div>
      <div>
        <h3>받으신 이메일을 열어 ‘인증하기’ </h3>
        <h3>버튼을 클릭하면 인증이 완료됩니다.</h3>
      </div>
    </>
  );
};

const authRequestCheckStep = handleSendReset => {
  return (
    <>
      <div>
        <h4>혹시 메일을 받지 못하셨나요?</h4>
        <h4>전송에 최대 5분이 소요될 수 있습니다.</h4>
        <h4>스팸편지함을 확인해주세요.</h4>
        <h4>인트라 아이디에 오타가 없는지 확인해주세요.</h4>
        <button onClick={handleSendReset}>
          인트라 아이디에 오타가 없는지 확인해주세요.
        </button>
      </div>
    </>
  );
};

const Auth = () => {
  const [isSend, setIsSend] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [input, setInput] = useState({
    email: '',
  });
  const [authInfo, setAuthInfo] = useState({
    email: '',
  });

  const onChange = e => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log(value);
  };
  const handleAuthenticate = () => {
    setAuthInfo({
      ...input,
    });
    FtAuthService.createFtAuth(authInfo.email);
    setIsSend(true);
    setIsBlock(true);

    console.log(input.email, '로 인증 시도');
    setTimeout(() => {
      setIsBlock(false);
    }, 3000);
  };
  const handleSendReset = () => {
    setIsSend(false);
    setInput({
      email: '',
    });
  };

  return (
    <Styled.AuthDiv>
      <div className="input_div">
        <TextField
          name="email"
          value={input.email}
          onChange={onChange}
          id="standard-basic"
          label="인트라 아이디"
        />
        <h1></h1>
      </div>
      <LoadingButton
        onClick={handleAuthenticate}
        endIcon={<SendIcon />}
        loading={isBlock}
        loadingPosition="end"
        variant="contained"
      >
        인증
      </LoadingButton>
      {isSend && authRequestInformation(authInfo.email)}
      {isSend && authRequestCheckStep(handleSendReset)}
    </Styled.AuthDiv>
  );
};

export default Auth;
