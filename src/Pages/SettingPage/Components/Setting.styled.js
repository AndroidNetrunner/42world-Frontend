import styled from 'styled-components';

const SettingDiv = styled.div`
  .setting_container_title {
    box-sizing: border-box;
    font-size: 1.2rem;
    color: #000;
    font-weight: 700;
    width: calc(100% - 1rem);
    background-color: #ccc;
    padding: 0.3rem 0.5rem;
    margin: 0.2rem 0.5rem;
  }
  .profile_image_div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    wrap: wrap;
    padding: 0.5rem;
    button {
      cursor: pointer;
      padding: 0;
      border: none;
      background-color: transparent;
      margin: 0 0.8rem;
      img {
        width: 100%;
      }
    }
  }
  .profile_name_div {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 1.3rem;
    label {
      color: #777;
      font-size: 0.9rem;
      margin-bottom: 0.4rem;
    }
    input {
      width: 6rem;
      padding: 0.2rem 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.2rem;
      margin-right: 0.5rem;
      font-size: 0.9rem;
    }
    button {
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      font-size: 0.8rem;
      color: #fff;
      background-color: #53b7ba;
      border: 1px solid #53b7ba;
      border-radius: 0.2rem;
    }
  }
`;

const OutlineImage = styled.img`
  border: 4px solid #53b7ba;
`;

const Styled = { SettingDiv, OutlineImage };

export default Styled;
