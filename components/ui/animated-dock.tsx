"use client" 

import * as React from "react"
import { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
 
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import Link from "next/link";
 
const cn = (...args: any[]) => twMerge(clsx(args));
 
export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}
 
export interface DockItemData {
  link: string;
  Icon: React.ReactNode;
  title?: string;
  target?: string;
  onClick?: (e: React.MouseEvent) => void;
}
 
export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);
 
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "relative mx-auto flex h-18 items-center gap-3.5 rounded-full bg-[#110f1c]/92 border border-white/12 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl px-5 py-2",
        className,
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX} title={item.title}>
          <Link
            href={item.link}
            target={item.target}
            onClick={item.onClick}
            title={item.title}
            className="grow flex items-center justify-center w-full h-full text-white"
          >
            {item.Icon}
          </Link>
        </DockItem>
      ))}
    </motion.div>
  );
};
 
interface DockItemProps {
  mouseX: MotionValue<number>;
  title?: string;
  children: React.ReactNode;
}
 
export const DockItem = ({ mouseX, title, children }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [44, 68, 44]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  const iconScale = useTransform(width, [44, 68], [1, 1.35]);
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      title={title}
      className="aspect-square rounded-full bg-[#7c5cff] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(124,92,255,0.4)] hover:shadow-[0_10px_25px_rgba(124,92,255,0.7)] transition-shadow cursor-pointer select-none"
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex items-center justify-center w-full h-full grow"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
