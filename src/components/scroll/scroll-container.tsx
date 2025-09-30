import style from './scroll-container.module.css';

type IScrollContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const ScrollContainer = ({
  children,
  className = '',
}: IScrollContainerProps): React.JSX.Element => {
  return <div className={`${style.scrollable} ${className}`}>{children}</div>;
};
