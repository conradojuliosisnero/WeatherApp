import './error.css'

function Error() {
	return (
		<div className="error">
			<div className="error__icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					viewBox="0 0 24 24"
					height="24"
					fill="none">
					<path fill="#ffffff" d="m13 13h-2v-6h2zm0 4h-2v-2h2" />
				</svg>
			</div>
			<div className="error__title">No se ah Encontrado tu locacion :(</div>
			<div className="error__close">
			</div>
		</div>
	);
}

export default Error;
