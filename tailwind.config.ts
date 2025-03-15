
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Neon colors for periodic table
				neon: {
					'red': '#FF0055',
					'blue': '#00DDFF',
					'green': '#00FF66',
					'purple': '#9D00FF',
					'yellow': '#FFDD00',
					'orange': '#FF7700',
					'pink': '#FF00AA'
				},
				element: {
					'alkali': '#FF5555',
					'alkaline': '#FFA500',
					'transition': '#FFFF55',
					'poor': '#55FF55',
					'nonmetal': '#55FFFF',
					'noble': '#FF55FF',
					'lanthanoid': '#AAAAFF',
					'actinoid': '#FF9999'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px rgba(0, 255, 255, 0.8), 0 0 10px rgba(0, 255, 255, 0.6)', 
					},
					'50%': { 
						boxShadow: '0 0 10px rgba(0, 255, 255, 0.9), 0 0 20px rgba(0, 255, 255, 0.7)', 
					}
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s infinite',
				'pulse-glow': 'pulse-glow 3s infinite'
			},
			boxShadow: {
				'neon-glow': '0 0 5px rgba(0, 255, 255, 0.8), 0 0 10px rgba(0, 255, 255, 0.6)',
				'neon-glow-hover': '0 0 10px rgba(0, 255, 255, 0.9), 0 0 20px rgba(0, 255, 255, 0.7)',
				'neon-red': '0 0 5px rgba(255, 0, 85, 0.8), 0 0 10px rgba(255, 0, 85, 0.6)',
				'neon-blue': '0 0 5px rgba(0, 221, 255, 0.8), 0 0 10px rgba(0, 221, 255, 0.6)',
				'neon-green': '0 0 5px rgba(0, 255, 102, 0.8), 0 0 10px rgba(0, 255, 102, 0.6)',
				'neon-purple': '0 0 5px rgba(157, 0, 255, 0.8), 0 0 10px rgba(157, 0, 255, 0.6)',
				'neon-yellow': '0 0 5px rgba(255, 221, 0, 0.8), 0 0 10px rgba(255, 221, 0, 0.6)',
				'neon-orange': '0 0 5px rgba(255, 119, 0, 0.8), 0 0 10px rgba(255, 119, 0, 0.6)',
				'neon-pink': '0 0 5px rgba(255, 0, 170, 0.8), 0 0 10px rgba(255, 0, 170, 0.6)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
