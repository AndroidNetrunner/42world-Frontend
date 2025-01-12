import styled from 'styled-components';
import ListItem from '@mui/material/ListItem';

const MenuModal = styled.div`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400;
  border: 2px solid #000;
`;

const MainHeader = styled.div`
  background-color: rgba(42, 45, 56, 1);
`;

const MainBody = styled.div`
  .mainpage-body {
    .preview {
      display: flex;
      flex-direction: row;
      .highlight {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
`;

const CusListItem = styled(ListItem)`
  && {
    background-color: red;
  }
`;
const Styled = { MenuModal, MainHeader, MainBody, CusListItem };

export default Styled;
