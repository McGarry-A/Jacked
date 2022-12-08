import { Box } from "native-base"
import WidgetHeader from "./WidgetHeader"

interface IWidgetContainer {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const WidgetContainer = (props: IWidgetContainer) => {
    const { title, subtitle, children } = props
    return (
        <Box
        marginY={1}
        borderWidth={2}
        borderColor={"whitesmoke"}
        borderRadius={10}
        padding={2}
        overflow={"hidden"}
        flex={1}
      >
            <WidgetHeader title={title} subtitle={subtitle} />
            {children}
      </Box>
    )
}

export default WidgetContainer