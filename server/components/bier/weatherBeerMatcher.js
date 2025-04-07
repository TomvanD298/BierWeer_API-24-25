export function getRecommendedBeers(beerList, temp, condition) {
  // Styles that always work no matter the weather
  const alwaysGoodStyles = ['Lager', 'Pilsner', "Saison"];

  // Weather-based styles
  let preferredStyles = [];

  if (temp >= 18) {
    preferredStyles = ['Witbier', 'IPA', 'Blond, Wheat Beer, Fruited'];
  } else if (temp < 10) {
    preferredStyles = ['Stout', 'Dubbel', 'Quadrupel'];
  } else {
    preferredStyles = ['Pale Ale', 'Tripel'];
  }

  if (condition.includes('rain')) {
    preferredStyles.push('Dubbel', 'Tripel', 'Quadrupel', 'Stout');
  }

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