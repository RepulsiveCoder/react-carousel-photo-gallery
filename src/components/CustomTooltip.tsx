import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';

type CustomTooltipProps = {
    title: React.ReactNode;
    children: React.ReactElement<any>;
    container?: HTMLDivElement | null | undefined,
    placement?: 'top' | 'bottom' | 'left' | 'right';
    arrow?: boolean;
    delayDuration?: number;
    enterTouchDelay?: number;
    leaveTouchDelay?: number;
    style?: React.CSSProperties;
    slotProps?: {
        tooltip?: { [slot: string]: unknown };
        content?: { [slot: string]: unknown };
        arrow?: { [slot: string]: unknown };
    };
}

export function CustomTooltip({ title = <></>, children, placement = 'top', container, style = {}  }: CustomTooltipProps) {
    const [open, setOpen] = React.useState(false);
    const [isTouch, setIsTouch] = React.useState(false);

    React.useEffect(() => {
        const detectTouch = () => setIsTouch(true);
        window.addEventListener('touchstart', detectTouch, { once: true });
        return () => window.removeEventListener('touchstart', detectTouch);
    }, []);

    return (
        <Tooltip.Provider>
            <Tooltip.Root open={isTouch ? open : undefined} onOpenChange={setOpen}>
                <Tooltip.Trigger asChild>
                    {React.cloneElement(children, {
                        onClick: (e: React.MouseEvent) => {
                            setOpen(true);
                            if (children.props.onClick) {
                                children.props.onClick(e);
                            }
                        }
                    })}
                </Tooltip.Trigger>
                <Tooltip.Portal container={container ?? undefined}>
                    <Tooltip.Content
                        className="bg-gray-800 text-white px-2 py-2 rounded shadow-md text-sm z-100"
                        side={placement}
                        sideOffset={5}
                    >
                        <div style={style}>
                            {title}
                        </div>
                        <Tooltip.Arrow className="fill-gray-800" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

export default CustomTooltip;
