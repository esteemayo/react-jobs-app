import styled from 'styled-components';

const DarkMode = () => {
  return (
    <Container>
      <Wrapper>Dark</Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #837dff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.5);
`;

const Wrapper = styled.div`
  width: 2rem;
  height: 2rem;
`;

export default DarkMode;
