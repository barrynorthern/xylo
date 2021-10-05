interface ILoaderProps {
    show: boolean;
}
export function Loader({show}: ILoaderProps) {
    return (show ? <div>Please wait...</div> : <div></div>);
};