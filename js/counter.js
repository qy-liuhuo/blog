document.addEventListener('DOMContentLoaded', function () {
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split('/').filter(segment => segment !== '');

    if (urlSegments.length === 0) {
        console.error('URL中未找到有效路径段');
        return;
    }

    const titleParam = urlSegments[urlSegments.length - 1];
    const apiEndpoint = `http:qylh.xyz/visit/` + titleParam;
    const apiUrl = new URL(apiEndpoint);

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态码: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.content) {
                throw new Error('无效的响应数据格式');
            }

            let container = document.getElementsByClassName("footer-inner")[0];
            if (!container) {
                container = document.createElement('div');
                container.id = 'footer-inner';
                document.body.prepend(container);
            }
            container.appendChild(document.createElement('<p>' + data.container + '</p>'));
        })
        .catch(error => {
            console.error('操作失败:', error);
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.textContent = `加载内容失败: ${error.message}`;
            document.body.prepend(errorDiv);
        });
});
