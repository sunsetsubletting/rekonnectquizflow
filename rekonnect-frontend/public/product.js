const rkImages=["assets/img1.png","assets/img2.png","assets/img3.png","assets/img4.png"];
let rkIndex=0;
function rkShowImage(i){rkIndex=i;fadeImage();}
function rkNextImage(){rkIndex=(rkIndex+1)%rkImages.length;fadeImage();}
function rkPrevImage(){rkIndex=(rkIndex-1+rkImages.length)%rkImages.length;fadeImage();}
function fadeImage(){const img=document.getElementById("rk-mainImage");img.style.opacity=0;setTimeout(()=>{img.src=rkImages[rkIndex];img.style.opacity=1;},200);}