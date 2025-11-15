/**
 * Logo de NutriSalud
 */
export default function Logo({ className = "w-10 h-10", showText = true }) {
    return (
        <div className="flex items-center space-x-2">
            <svg 
                className={className} 
                viewBox="0 0 500 500" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Manzana */}
                <path 
                    d="M250 350C305.228 350 350 305.228 350 250C350 194.772 305.228 150 250 150C194.772 150 150 194.772 150 250C150 305.228 194.772 350 250 350Z" 
                    stroke="#10B981" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
                
                {/* Tallo */}
                <path 
                    d="M250 150C250 150 230 120 210 110C190 100 170 105 160 120" 
                    stroke="#10B981" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
                
                {/* Hoja */}
                <path 
                    d="M245 160C245 140 260 100 300 95C340 90 355 110 355 130C355 150 340 165 320 165C300 165 280 155 270 145L245 160Z" 
                    stroke="#10B981" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
                
                {/* Vena de la hoja */}
                <path 
                    d="M285 135C295 125 315 115 330 120" 
                    stroke="#10B981" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                />
                
                {/* Detalle curvo inferior derecho de la manzana */}
                <path 
                    d="M320 200C330 240 335 280 330 310" 
                    stroke="#10B981" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                />
            </svg>
            
            {showText && (
                <span className="text-2xl font-bold text-green-600">
                    NutriSalud
                </span>
            )}
        </div>
    );
}
