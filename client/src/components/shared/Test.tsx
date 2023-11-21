export interface ITestProps {
  children?: React.ReactNode;
}

export const Test = ({ children }: ITestProps) => {
	return <>{children}</>;
};
