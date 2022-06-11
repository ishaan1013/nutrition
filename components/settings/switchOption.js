export default function SwitchOption(props) {
    if ((props.isKg && props.kg) || (!props.isKg && !props.kg)) {   
        return (
            <div 
            className="cursor-pointer rounded-full py-2 px-4 bg-blue-500/90 font-semibold text-sm text-white"
            >
                {props.optionText}
            </div>
        )
    }
    else {
        return (
            <div 
            className="cursor-pointer rounded-full py-2 px-4 bg-transparent font-medium text-sm text-slate-600"
            onClick={() => {props.setIsKg(!props.isKg)}}
            >
                {props.optionText}
            </div>
        )
    }
}