import { BlurView } from "expo-blur";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";
interface LoadingProps {
    title?: string;
}

const LoadingComponent = (props : LoadingProps) => {
    return (
        <BlurView intensity={40} tint="light" className="absolute flex-1 items-center justify-center w-full h-full">    
            <Spinner size={"large"} />
            <Text size="lg">{props.title}</Text>
        </BlurView>
    )
}

export default LoadingComponent;