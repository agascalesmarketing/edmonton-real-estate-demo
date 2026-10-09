const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menuButton&&nav){
 const close=()=>{nav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('.menu-word').textContent='Menu';};
 menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.querySelector('.menu-word').textContent=open?'Close':'Menu';});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('is-open')){close();menuButton.focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))close();});
 matchMedia('(min-width: 901px)').addEventListener('change',event=>{if(event.matches)close();});
}
const filters=document.querySelector('[data-filters]');
if(filters){
 const cards=[...document.querySelectorAll('[data-property]')];
 const count=document.querySelector('[data-result-count]');
 const empty=document.querySelector('[data-empty]');
 const apply=()=>{const price=filters.elements.price.value,bedrooms=Number(filters.elements.bedrooms.value),type=filters.elements.type.value;let visible=0;
 cards.forEach(card=>{const amount=Number(card.dataset.price);const priceMatch=price==='all'||(price==='under500'&&amount<500000)||(price==='500to800'&&amount>=500000&&amount<=800000)||(price==='over800'&&amount>800000);const match=priceMatch&&Number(card.dataset.beds)>=bedrooms&&(type==='all'||card.dataset.type===type);card.hidden=!match;if(match)visible++;});
 count.textContent=`${visible} ${visible===1?'fictional property':'fictional properties'}`;empty.hidden=visible>0;
 };
 filters.addEventListener('change',apply);filters.addEventListener('submit',event=>event.preventDefault());filters.addEventListener('reset',()=>setTimeout(apply,0));apply();
}
for(const form of document.querySelectorAll('[data-demo-form]')){
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('[data-form-status]');form.reset();status.hidden=false;status.textContent='Demo complete. Nothing was sent or saved. Your entries have been cleared. In a live website, this is where an inquiry would be submitted.';status.focus();});
}
for(const button of document.querySelectorAll('[data-print]'))button.addEventListener('click',()=>window.print());
for(const fieldset of document.querySelectorAll('[data-demo-form] fieldset'))fieldset.disabled=false;
