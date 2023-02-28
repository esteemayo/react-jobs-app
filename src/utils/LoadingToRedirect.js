import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Navbar from 'components/Navbar';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate('/');
    return () => clearTimeout(timeout);
  }, [count, navigate]);

  return (
    <Container>
      <Navbar />
      <Header>Redirecting you in {count} seconds</Header>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.h5`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #645cff;
  font-size: 2rem;
  margin-top: 1.5rem;
  text-transform: none;
`;

export default LoadingToRedirect;
