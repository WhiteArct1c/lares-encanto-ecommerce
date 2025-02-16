import React    from "react";

interface SelectResultStepComponentProps {}

let fullfilled = false;
let promise: Promise<void> | null = null;

const useTimeout = (ms: number) => {
    if (!fullfilled) {
        throw promise ||= new Promise((res) => {
            setTimeout(() => {
                fullfilled = true;
                res();
            }, ms);
        });
    }
};

const SelectResultStepComponent: React.FC<SelectResultStepComponentProps> = () => {
    useTimeout(15000);

    return (
        <>
            select
        </>
    );
}

export default SelectResultStepComponent;