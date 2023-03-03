import styled from 'styled-components';

const DarkMode = () => {
  return (
    <Container>
      <Wrapper>Dark</Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 1%;
  width: 4rem;
  height: 4rem;
  background-color: #131417;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: #e4e4e8;
  border-radius: 50%;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: 2px;
  border: 0;
  transform: scale(0.75);
  cursor: pointer;
  transition: all 200ms ease-in;
`;

export default DarkMode;
