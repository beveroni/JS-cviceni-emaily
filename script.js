console.log('Funguju');

//ZADANI 1.
/*
Vytvoříme jednoduchou aplikaci, která zobrazuje obsah e-mailové schránky.

Vytvořte si repozitář ze šablony cviceni-emaily aplikace pro práci s e-maily.
Prohlédněte si dokumentaci k e-mailovému API. V prohlížeči si vyzkoušejte, jak API funguje.
Podívejte se, jak se v HTML vytváří jeden e-mail.
Smažte v HTML obsah elementu #inbox. Zobrazte na stránce e-maily stažené z API. Tělo e-mailu nechte prozatím prázdné.

*/

const vypisEmailu = (emails) => {
  const emailListElm = document.querySelector('#app');
  emailListElm.innerHTML += emails
    .map((email) => {
      return ` <div class="email__head">
    <button class="email__icon email__icon--closed"></button>
    <div class="email__info">
      <div class="email__sender">${email.sender.name}</div>
      <div class="email__subject">${email.subject}</div>
    </div>
    <div class="email__time">${email.time}</div>
  </div>
  <div class="email__body"></div>
</div>`;
    })
    .join('');
};

fetch('https://apps.kodim.cz/daweb/trening-api/apis/emails')
  .then((response) => response.json())
  .then((data) => vypisEmailu(data.emails));

//ZADANI 2.

/*
V naší e-mailové aplikaci zobrazíme dvě oddělené sekce: přečtené zprávy a nepřečtené zprávy.

V HTML stránce vytvořte dvě sekce. Jedna bude sloužit k zobrazení přečtené a druhá nepřečtené pošty.
Naplňte každou sekci přislušnými zprávami načtenými z API.
Zařiďte, aby se u přečtených e-mailů zobrazovala ikonka otevřené obálky (viz CSS třída email__icon--opened).
*/

const renderSection = (emails, elementId) => {
  document.getElementById(elementId).innerHTML = emails
    .map((email) => {
      let iconClass = 'closed';
      if (elementId === 'read') {
        iconClass = 'opened';
      }

      return `
      <div class="email">
        <div class="email__head">
          <div class="email__icon email__icon--${iconClass}"></div>
          <div class="email__info">
            <div class="email__sender">${email.sender.name}</div>
            <div class="email__subject">${email.subject}</div>
          </div>
          <div class="email__time">${email.time}</div>
        </div>
        <div class="email__body"></div>
      </div>
    `;
    })
    .join('');
};

fetch(`https://apps.kodim.cz/daweb/trening-api/apis/emails?folder=unread`)
  .then((response) => response.json())
  .then((data) => renderSection(data.emails, 'unread'));

fetch(`https://apps.kodim.cz/daweb/trening-api/apis/emails?folder=read`)
  .then((response) => response.json())
  .then((data) => renderSection(data.emails, 'read'));
