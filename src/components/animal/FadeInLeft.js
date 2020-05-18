import { fadeInLeft } from 'react-animations';
import styled, { keyframes } from 'styled-components';

export const FadeInLeft = styled.div`animation: 2.5s ${keyframes`${fadeInLeft}`}`;
