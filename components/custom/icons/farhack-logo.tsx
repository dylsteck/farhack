import type { FC } from 'react';
import Image from 'next/image';
import farhackLogo from '../../../public/farhackLogo.png';
import farhackLogoGradient from '../../../public/farhackLogoGradient.png';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  gradient?: boolean;
}

const FarHackLogo: FC<LogoProps> = (props) => {
  const { width, height, className, gradient = false } = props;

  return (
    <Image
      alt="Farhack logo"
      className={`${className}`}
      height={height}
      objectFit="contain"
      src={gradient ? farhackLogoGradient : farhackLogo}
      width={width}
    />
  );
};

export default FarHackLogo;