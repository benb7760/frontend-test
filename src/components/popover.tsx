import React, { useState } from "react";
import { ReactNode, useEffect } from "react";
import styled from 'styled-components';
import { DividerHorizontal } from "./divider-horizontal";

import './popover.css';

export type PopoverTrigger = 'click' | 'hover';
export type PopoverPlacement =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';

export interface PopoverProps {
    trigger: PopoverTrigger;
    title: string;
    content: ReactNode;
    placement: PopoverPlacement;
    children: JSX.Element;
}

const PopoverBackground = styled.div`
    z-index: 999;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;`;

const PopoverContainer = styled.div`
    z-index: 1000;
    position: absolute;
    text-align: left;`;

const PopoverArrow = styled.div`
    z-index: 1;
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #fff;
    transform:rotate(45deg);`;

const PopoverInner = styled.div`
    position: relative;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.08) 0px 6px 16px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
    border-radius: 2px;`;

const PopoverTitle = styled.div`
    padding: 5px 16px 4px;`;

const PopoverContent = styled.div`
    padding: 12px 16px;`;

interface PositionStyle {
    left?: string;
    right?: string;
    bottom?: string;
    top?: string;
}

export function Popover(props: PopoverProps) {

    const [isShowing, setIsShowing] = useState(false);

    const [positionStyle, setPositionStyle] = useState<PositionStyle>({ left: undefined, right: undefined, top: undefined, bottom: undefined });

    const [additionalClassNames, setAdditionalClassNames] = useState("");

    let triggerRef: HTMLElement | null = null;

    function show() {
        if (triggerRef) {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const rect = triggerRef.getBoundingClientRect();

            const position: PositionStyle = {};
            if (props.placement === 'left' || props.placement === 'leftTop' || props.placement === 'leftBottom') {
                position.right = `${windowWidth - rect.left}px`;
            }

            if (props.placement === 'right' || props.placement === 'rightTop' || props.placement === 'rightBottom') {
                position.left = `${rect.right}px`;
            }

            position.top = `${rect.top + (rect.height / 2)}px`;

            setPositionStyle(position);
            setAdditionalClassNames(`popover-${props.placement}`);
        }
        setIsShowing(true);
    }

    function hide() {
        setIsShowing(false);
    }

    // I chose to clone the trigger element here, in order to apply the required events to it.
    // I could have instead wrapped it in another element, but in doing this we might lose
    // styling related to the actual trigger. For example, if the element was positioned relative
    // to something else, the new div would not include this, and instead the trigger would be
    // positioned relative to the inner div.
    const triggerElement = React.Children.only(props.children) as React.ReactElement;
    const triggerProps: any = {
        key: "trigger", ref: (r: HTMLElement) => triggerRef = r
    };

    if (props.trigger === 'click') {
        triggerProps.onClick = () => show();
    }

    const trigger = React.cloneElement(triggerElement, triggerProps);

    return (<>
        {trigger}
        {isShowing && <>
            <PopoverBackground key="background" onClick={() => hide()} />
            <PopoverContainer key="content" className={`popover-${props.placement}`} style={positionStyle}>
                <PopoverArrow className={`popover-arrow-${props.placement}`} />
                <PopoverInner>
                    <PopoverTitle>{props.title}</PopoverTitle>
                    <DividerHorizontal />
                    <PopoverContent>{props.content}</PopoverContent>
                </PopoverInner>
            </PopoverContainer>
        </>}</>);
}
