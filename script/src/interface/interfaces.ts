// Définition de l'interface pour les attributs
export interface Attribute {
    trait_type: string;
    value: string;
}

// Définition de l'interface pour les métadonnées
export interface Metadata {
    name: string;
    description: string;
    image: string;
    attributes: Attribute[];
}
