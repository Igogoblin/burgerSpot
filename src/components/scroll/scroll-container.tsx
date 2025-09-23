import style from './scroll-container.module.css';

type IScrollContainerProps = {
  children: React.ReactNode;
};

export const ScrollContainer = ({
  children,
}: IScrollContainerProps): React.JSX.Element => {
  return <div className={style.scrollable}>{children}</div>;
};
