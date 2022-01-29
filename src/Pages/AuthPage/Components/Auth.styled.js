import styled from 'styled-components';
import GlobalStyled from '../../../Styled/Global.styled';

const AuthDiv = styled.div`
  padding: 2rem;
  display: flex;

  flex-direction: column;
  color: ${GlobalStyled.theme.textColorWhite};
  fill: ${GlobalStyled.theme.textColorWhite};

  .input_div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    h1 {
      margin-top: 16px
      &::after {
        content: '@student.42seoul.kr';
        color: #fff;
      }
    }
  }

  * {
    text-align: center;
  }
`;

const Styled = { AuthDiv };

export default Styled;
