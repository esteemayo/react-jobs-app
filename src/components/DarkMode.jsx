import styled from 'styled-components';
import { useSelector } from 'react-redux';

const DarkMode = () => {
  const { darkMode } = useSelector((state) => state.darkMode);

  return (
    <Container>
      <Wrapper>
        {darkMode ? 'Light' : 'Dark'}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 1%;
  width: 3rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.bgMode};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: ${({ theme }) => theme.bgIconMode};
  border-radius: 50%;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: 2px;
  border: 0;
  transform: scale(0.75);
  cursor: pointer;
  transition: all 200ms ease-in;

  & > * {
    color: ${({ theme }) => theme.textMode};
  }
`;

export default DarkMode;
