import styled from 'styled-components';

const DarkMode = () => {
  return (
    <Container>Dark</Container>
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
`;

const Wrapper = styled.div`
  
`;

export default DarkMode;
