// Dados compartilhados para os cartões de conteúdo
// Adicione novos conteúdos aqui para aparecer em ambos os componentes

export const contentCards = [
  {
    section: 'Sobre o Tom da sua pele',
    cards: [
      {
        subtitle: 'Albinismo',
        image: 'Albinismo.jpg',
        route: 'DermatiteDetalhe',
      },
      {
        subtitle: 'Cuidados especiais da pele albina',
        image: 'criança-albina.jpeg',
        route: 'CuidadosEspeciaisAlbinismoDetalhe',
      },
    ],
  },
  {
    section: 'Dermatite',
    cards: [
      {
        subtitle: 'Mentiras sobre Dermatite',
        image: 'Mentiras sobre a Dermatite.jpg',
        route: 'DermatiteDetalhe',
      },
      {
        subtitle: 'O que é Dermatite?',
        image: 'O que é dermatite.jpg',
        route: 'DermatiteDetalhePage',
      },
    ],
  },
];
