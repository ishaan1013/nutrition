import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineIndeterminateCheckBox } from "react-icons/md"

export default function Checkbox(props) { 
    if (props.before) {
        return <MdOutlineIndeterminateCheckBox className="mr-2 opacity-50" />
    }
    else {
        return <MdOutlineCheckBoxOutlineBlank className="mr-2 opacity-50" />
    }
}