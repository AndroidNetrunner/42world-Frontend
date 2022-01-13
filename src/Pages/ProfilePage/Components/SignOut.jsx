import CommonStyled from '../Common.styled';

const SignOut = () => {
  const handleSignOut = () => {
    console.log('로그아웃 버튼 클릭');
  };
  return (
    <CommonStyled.CustomDiv>
      <div onClick={handleSignOut}>로그아웃</div>
    </CommonStyled.CustomDiv>
  );
};

export default SignOut;
