import { animated, useSpring } from '@react-spring/web'

export const Transition = ({
	children,
	springs,
}: {
	children: React.ReactElement
	springs?: {
		from: Record<string, unknown>
		to: Record<string, unknown>
		config?: Record<string, unknown>
	}
}) => {
	const animationSprings = useSpring(
		springs ?? {
			from: { x: -100 },
			to: { x: 0 },
			config: { duration: 5 },
		}
	)

	return <animated.div style={{ ...animationSprings }}>{children}</animated.div>
}
