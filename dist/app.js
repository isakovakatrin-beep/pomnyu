(() => {
  const state=[false,false,false,false,false];
  const descriptions=['Три опоры вспомнили','Галерея или диалог открыты','Воспоминание найдено','Пробуем другой способ поиска','Поиск завершён'];
  function render(){
    document.querySelectorAll('[data-step]').forEach(button=>button.setAttribute('aria-pressed',String(state[Number(button.dataset.step)])));
    document.querySelectorAll('[data-dot]').forEach(dot=>dot.classList.toggle('on',state[Number(dot.dataset.dot)]));
  }
  document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>{
    const i=Number(button.dataset.step);state[i]=!state[i];
    if(state[i]&&i===2)state[3]=false;
    if(state[i]&&i===3)state[2]=false;
    render();document.getElementById('status').textContent=state[i]?descriptions[i]:'Отметка снята';
  }));
  function fit(){
    const mobile=matchMedia('(max-width:767px)').matches;
    const width=Math.min(innerWidth,mobile?600:1440),base=mobile?360:1440,height=mobile?3818:6373;
    const canvas=document.querySelector(mobile?'.mobile':'.desktop');
    canvas.style.transform=`scale(${width/base})`;document.getElementById('longread').style.height=`${height*width/base}px`;
    document.querySelector('.desktop').setAttribute('aria-hidden',String(mobile));document.querySelector('.mobile').setAttribute('aria-hidden',String(!mobile));
  }
  addEventListener('resize',fit);fit();render();
})();
