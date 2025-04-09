export function getRecommendedBeers(beerList, temp, condition) {
  // Styles that always work no matter the weather
  const alwaysGoodStyles = ['Lager', 'Pilsner', 'Saison'];

  let preferredStyles = [];
  
  // Temperatuurgebaseerde keuzes
  if (temp >= 16) {
    preferredStyles = ['Witbier', 'Weizen', 'Blond', 'IPA', 'Fruited'];
  } else if (temp >= 10 && temp < 16) {
    preferredStyles = ['Pale Ale', 'Tripel', 'Saison'];
  } else {
    preferredStyles = ['Dubbel', 'Quadrupel', 'Stout'];
  }
  
  // Extra voorkeur bij koud & regenachtig weer
  if (temp < 5 && condition.includes('rain')) {
    preferredStyles.push('Dubbel', 'Tripel', 'Quadrupel', 'Stout');
  }
  
  // Eventueel combineren met altijd-goed stijlen
  const allRecommendedStyles = [...new Set([...alwaysGoodStyles, ...preferredStyles])];
  

  return beerList.filter((beer) => {
    const style = (beer["Beer style"] || '').toLowerCase();

    // Check for weather styles OR always-good styles
    const isPreferred = preferredStyles.some(p => style.includes(p.toLowerCase()));
    const isAlwaysGood = alwaysGoodStyles.some(p => style.includes(p.toLowerCase()));

    return isPreferred || isAlwaysGood;
  });
}


export const beerColorMap = {
  'Witbier': 'url(#witbierGradient)',
  'IPA': 'url(#ipaGradient)',
  'Blond': 'url(#blondGradient)',
  'Pale Ale': 'url(#paleAleGradient)',
  'Tripel': 'url(#tripelGradient)',
  'Dubbel': 'url(#dubbelGradient)',
  'Quadrupel': 'url(#quadrupelGradient)',
  'Stout': 'url(#stoutGradient)',
  'Lager': 'url(#lagerGradient)',
  'Pilsner': 'url(#pilsnerGradient)',
  'Bock': 'url(#bockGradient)',
  'Saison': 'url(#saisonGradient)',
  'Fruited': 'url(#fruitedGradient)',
  'Sour': 'url(#sourGradient)',
  'Other': 'url(#otherGradient)'
};