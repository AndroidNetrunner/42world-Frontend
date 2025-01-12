import { Footer } from 'Components';
import { ProfileHeader } from 'Components';
import GlobalStyled from 'Styled/Global.styled';
import { MyComment } from './Components';

const MyCommentPage = () => {
  return (
    <GlobalStyled.ProfileBackgroundDiv>
      <ProfileHeader title={'내 댓글'} />
      <MyComment />
      <Footer />
    </GlobalStyled.ProfileBackgroundDiv>
  );
};

export default MyCommentPage;
