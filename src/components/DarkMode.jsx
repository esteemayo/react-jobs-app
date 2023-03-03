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
  background-color: #131417;
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
  background-color: #e4e4e8;
  border-radius: 50%;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
`;

export default DarkMode;
