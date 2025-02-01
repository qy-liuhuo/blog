document.addEventListener('DOMContentLoaded', function () {
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split('/').filter(segment => segment !== '');

    if (urlSegments.length === 0) {
        console.error('URL中未找到有效路径段');
        return;
    }

    const titleParam = urlSegments[urlSegments.length - 1];

    fetch(`../visit/` + titleParam)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态码: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let container = document.getElementsByClassName("footer-inner")[0];
            if (!container) {
                container = document.createElement('div');
                container.id = 'footer-inner';
                document.body.prepend(container);
            }
            container.appendChild(document.createElement('div').appendChild(document.createTextNode(`访问量: ${data.visitCount}`)));
        })
        .catch(error => {
            console.error('操作失败:', error);
        });
});
