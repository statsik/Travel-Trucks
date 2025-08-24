import clsx from 'clsx';
import s from './Container.module.css';

const Container = ({ children, className }) => {
  return <div className={clsx(s.container, className)}>{children}</div>;
};

export default Container;
