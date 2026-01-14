import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Wheat, Droplets, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Import product images
import riceImg from '@/assets/jasmine-rice-or-uncooked-rice-in-burlap-sack-on-wooden-table-with-the-rice-field-background-photo.jpg';
import sugarImg from '@/assets/sugar-cubes.jpg';
import wheatImg from '@/assets/pexels-pixabay-39015.jpg';
import maizeImg from '@/assets/OIP.webp';
import pulsesImg from '@/assets/wp8255736.jpg';
import spicesImg from '@/assets/l-intro-1670951341.jpg';

const productCategories = [
	{
		id: 'rice',
		name: 'Rice',
		icon: '🌾',
		image: riceImg,
		description: 'Premium Indian rice varieties for global markets',
		varieties: [
			{
				name: 'Basmati Rice',
				types: [
					'1121 Steam/Sella',
					'1509 Steam/Sella',
					'Pusa Basmati',
					'Traditional Basmati',
				],
				packaging: '5kg, 10kg, 25kg, 50kg PP/Jute bags',
			},
			{
				name: 'Non-Basmati Rice',
				types: ['Sona Masoori', 'IR-64', 'PR-11', 'Parboiled Rice'],
				packaging: '25kg, 50kg PP bags',
			},
		],
	},
	{
		id: 'sugar',
		name: 'Sugar',
		icon: '🍬',
		image: sugarImg,
		description: 'High-quality refined and raw sugar',
		varieties: [
			{
				name: 'Refined Sugar',
				types: ['ICUMSA 45', 'ICUMSA 100', 'ICUMSA 150'],
				packaging: '50kg PP bags, Big bags 1MT',
			},
			{ name: 'Raw Sugar', types: ['VHP Sugar', 'Brown Sugar'], packaging: 'Bulk shipments, 50kg bags' },
		],
	},
	{
		id: 'wheat',
		name: 'Wheat',
		icon: '🌾',
		image: wheatImg,
		description: 'Premium wheat and wheat products',
		varieties: [
			{
				name: 'Wheat Grain',
				types: ['Durum Wheat', 'Sharbati Wheat', 'Lokwan Wheat'],
				packaging: '50kg PP/Jute bags',
			},
			{
				name: 'Wheat Products',
				types: ['Wheat Flour (Atta)', 'Semolina (Suji)', 'Wheat Bran'],
				packaging: '1kg-50kg packaging',
			},
		],
	},
	{
		id: 'maize',
		name: 'Maize',
		icon: '🌽',
		image: maizeImg,
		description: 'Yellow and white maize for various applications',
		varieties: [
			{
				name: 'Yellow Maize',
				types: ['Feed Grade', 'Food Grade', 'Popcorn Maize'],
				packaging: '50kg PP bags, Bulk',
			},
		],
	},
	{
		id: 'pulses',
		name: 'Pulses',
		icon: '🫘',
		image: pulsesImg,
		description: 'Nutritious pulses and lentils',
		varieties: [
			{
				name: 'Lentils',
				types: ['Red Lentils (Masoor)', 'Yellow Lentils (Toor)', 'Green Lentils (Moong)'],
				packaging: '25kg, 50kg PP bags',
			},
			{
				name: 'Chickpeas',
				types: ['Kabuli Chana', 'Desi Chana', 'Chana Dal'],
				packaging: '25kg, 50kg bags',
			},
			{ name: 'Others', types: ['Black-eyed Peas', 'Kidney Beans', 'Urad Dal'], packaging: 'Custom packaging' },
		],
	},
	{
		id: 'spices',
		name: 'Spices',
		icon: '🌶️',
		image: spicesImg,
		description: 'Authentic Indian spices and seasonings',
		varieties: [
			{
				name: 'Whole Spices',
				types: ['Coriander Seeds', 'Turmeric Fingers', 'Chili'],
				packaging: '10kg, 25kg bags',
			},
		],
	},
];

export default function ProductsSection() {
	const [activeCategory, setActiveCategory] = useState('rice');
	const activeProduct = productCategories.find(p => p.id === activeCategory);

	const handleDownloadCatalog = () => {
		const doc = new jsPDF();

		// Title
		doc.setFontSize(22);
		doc.setTextColor(255, 107, 0); // Orange color
		doc.text('GROWORA - Product Catalog', 14, 20);

		doc.setFontSize(12);
		doc.setTextColor(100);
		doc.text('Premium Agricultural Commodities from India', 14, 28);
		doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 34);

		let yPos = 45;

		productCategories.forEach((category) => {
			// Section Header
			doc.setFontSize(16);
			doc.setTextColor(0);
			doc.text(category.name, 14, yPos);

			doc.setFontSize(10);
			doc.setTextColor(100);
			doc.text(category.description, 14, yPos + 6);

			yPos += 12;

			// Prepare table data
			const tableData = category.varieties.map(v => [
				v.name,
				v.types.join('\n'),
				v.packaging
			]);

			autoTable(doc, {
				startY: yPos,
				head: [['Variety', 'Types', 'Packaging']],
				body: tableData,
				theme: 'grid',
				headStyles: { fillColor: [255, 107, 0], textColor: 255 }, // Orange header
				styles: { fontSize: 10, cellPadding: 3 },
				columnStyles: {
					0: { fontStyle: 'bold', cellWidth: 40 },
					1: { cellWidth: 80 },
					2: { cellWidth: 'auto' }
				},
				didDrawPage: (data) => {
					// Add footer on each page
					doc.setFontSize(8);
					doc.setTextColor(150);
					doc.text('www.groworaindia.com', data.settings.margin.left, doc.internal.pageSize.height - 10);
				}
			});

			// Update yPos for next category
			yPos = (doc as any).lastAutoTable.finalY + 15;

			// Check if we need a new page
			if (yPos > 250) {
				doc.addPage();
				yPos = 20;
			}
		});

		doc.save('GROWORA_Catalog.pdf');
	};

	return (
		<section id="products" className="py-24 lg:py-32 bg-background relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-orange/5 to-transparent" />
			<div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-navy/5 to-transparent" />

			<div className="container mx-auto px-4 lg:px-8 relative z-10">
				{/* Header */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 rounded-full text-orange font-ui text-sm mb-4"
					>
						<Package className="w-4 h-4" />
						Product Portfolio
					</motion.span>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="font-heading text-3xl lg:text-5xl font-bold text-foreground mb-4"
					>
						Premium{' '}
						<span className="text-gradient-orange">Agro Commodities</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="text-muted-foreground text-lg font-body"
					>
						From India&apos;s finest agricultural regions to your market —
						quality assured, competitively priced.
					</motion.p>
				</div>

				{/* Category Tabs */}
				<div className="flex flex-wrap justify-center gap-3 mb-12">
					{productCategories.map((category, i) => (
						<motion.button
							key={category.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.05 }}
							onClick={() => setActiveCategory(category.id)}
							className={`relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${activeCategory === category.id
								? 'ring-2 ring-orange shadow-glow'
								: 'hover:ring-1 hover:ring-orange/50'
								}`}
							style={{
								backgroundImage: `linear-gradient(rgba(0, 0, 0, ${activeCategory === category.id ? '0.3' : '0.5'
									}), rgba(0, 0, 0, ${activeCategory === category.id ? '0.3' : '0.5'
									})), url(${category.image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}
						>
							<span className="text-lg relative z-10">{category.icon}</span>
							<span className="font-ui font-medium relative z-10 text-white">
								{category.name}
							</span>
						</motion.button>
					))}
				</div>

				{/* Active Category Content */}
				{activeProduct && (
					<motion.div
						key={activeProduct.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="glass-card p-8 lg:p-12"
					>
						<div className="flex items-start gap-6 mb-8">
							<div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
								<img
									src={activeProduct.image}
									alt={activeProduct.name}
									className="w-full h-full object-cover"
								/>
							</div>
							<div>
								<h3 className="font-heading text-2xl font-bold text-foreground mb-2">
									{activeProduct.name}
								</h3>
								<p className="text-muted-foreground font-body">
									{activeProduct.description}
								</p>
							</div>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{activeProduct.varieties.map((variety, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.1 }}
									className="bg-muted/50 rounded-xl p-6 hover:bg-muted transition-colors"
								>
									<h4 className="font-heading font-bold text-foreground mb-3">
										{variety.name}
									</h4>
									<div className="space-y-3">
										<div>
											<span className="text-xs font-ui text-muted-foreground uppercase tracking-wide">
												Varieties
											</span>
											<ul className="mt-1 space-y-1">
												{variety.types.map((type, j) => (
													<li
														key={j}
														className="text-sm text-foreground flex items-center gap-2"
													>
														<span className="w-1.5 h-1.5 bg-orange rounded-full" />
														{type}
													</li>
												))}
											</ul>
										</div>
										<div>
											<span className="text-xs font-ui text-muted-foreground uppercase tracking-wide">
												Packaging
											</span>
											<p className="text-sm text-foreground mt-1">
												{variety.packaging}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* CTA */}
						<div className="mt-8 flex flex-wrap gap-4 justify-center">
							<Button variant="hero" size="lg" className="group">
								Request Quote
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="group"
								onClick={handleDownloadCatalog}
							>
								Download Catalog
							</Button>
						</div>
					</motion.div>
				)}

				{/* Quality Note */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-12 text-center"
				>
					<p className="text-muted-foreground font-body">
						All products available in FOB/CIF terms • Custom packaging available
						• Quality certifications provided
					</p>
				</motion.div>
			</div>
		</section>
	);
}
