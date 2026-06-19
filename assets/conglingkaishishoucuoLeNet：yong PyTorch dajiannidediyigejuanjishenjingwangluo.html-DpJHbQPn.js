import{_ as s,c as e,d as a,o as i}from"./app-CQ6HsZN1.js";const l={};function d(t,n){return i(),e("div",null,[...n[0]||(n[0]=[a(`<h1 id="从零开始手搓-lenet-用-pytorch-搭建你的第一个卷积神经网络" tabindex="-1"><a class="header-anchor" href="#从零开始手搓-lenet-用-pytorch-搭建你的第一个卷积神经网络"><span>从零开始手搓 LeNet：用 PyTorch 搭建你的第一个卷积神经网络</span></a></h1><h2 id="一、前言-为什么先从-lenet-开始" tabindex="-1"><a class="header-anchor" href="#一、前言-为什么先从-lenet-开始"><span>一、前言：为什么先从 LeNet 开始？</span></a></h2><p>最近开始入门深度学习，从最简单的基础开始了解学习，这里是我学习的第一个卷积神经网络，是一个很好的教学级的Demo。</p><p>如果你刚开始学深度学习，面对满屏的 ResNet、Transformer、Diffusion Model，大概率会有点懵。这些模型确实很强，但它们的复杂度也足以劝退很多新手。</p><p>我的建议是，从基础开始学习，先回到源头，从 LeNet 开始。这是 Yann LeCun 在 1998 年提出的卷积神经网络架构，虽然快三十年了，但它把 CNN 的核心思想讲得一清二楚。理解了 LeNet，再看后面的模型，你会有一种「原来都是在这个基础上搭积木」的感觉。</p><p>这篇文章，介绍从0开始，一行一行把 LeNet 搭起来，并且跑通训练流程。</p><blockquote><p><strong>特别注意</strong> 本文假设你已经装好了 PyTorch 和 torchvision。如果还没装，建议先跑通官方的安装命令，确保 <code>import torch</code> 不会报错。</p></blockquote><hr><h2 id="二、lenet-的架构概览" tabindex="-1"><a class="header-anchor" href="#二、lenet-的架构概览"><span>二、LeNet 的架构概览</span></a></h2><p>在写代码之前，我们先搞清楚 LeNet 长什么样。</p><p>LeNet 的整体结构可以分成两大块：</p><ol><li><strong>卷积层块（conv）</strong>：负责从图片里提取特征</li><li><strong>全连接层块（fc）</strong>：负责根据特征做分类判断</li></ol><p>整个数据流是这样的：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">输入图片 (1x28x28)</span>
<span class="line">    ↓</span>
<span class="line">卷积层 1 (1→6 通道, 5x5 核) + Sigmoid</span>
<span class="line">    ↓</span>
<span class="line">池化层 1 (2x2 MaxPool)</span>
<span class="line">    ↓</span>
<span class="line">卷积层 2 (6→16 通道, 5x5 核) + Sigmoid</span>
<span class="line">    ↓</span>
<span class="line">池化层 2 (2x2 MaxPool)</span>
<span class="line">    ↓</span>
<span class="line">拉平 (16x4x4 = 256 维)</span>
<span class="line">    ↓</span>
<span class="line">全连接层 1 (256→120) + Sigmoid</span>
<span class="line">    ↓</span>
<span class="line">全连接层 2 (120→84) + Sigmoid</span>
<span class="line">    ↓</span>
<span class="line">全连接层 3 (84→10) → 输出 10 个类别的分数</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以把前面的卷积层块理解成「眼睛」，它负责看图、找规律。后面的全连接层块理解成「大脑」，它负责根据看到的规律做判断。</p><hr><h2 id="三、环境准备" tabindex="-1"><a class="header-anchor" href="#三、环境准备"><span>三、环境准备</span></a></h2><h3 id="_3-1-确认-pytorch-环境" tabindex="-1"><a class="header-anchor" href="#_3-1-确认-pytorch-环境"><span>3.1 确认 PyTorch 环境</span></a></h3><p>我们先确认一下环境是否正常。打开你的 Python 环境，输入：</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">import torch</span>
<span class="line">print(torch.__version__)</span>
<span class="line">print(torch.cuda.is_available())</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><p>如果第二行输出 <code>True</code>，说明GPU 可以用。如果输出 <code>False</code>，也没关系，CPU 也能跑，只是慢一点，这里用的Fashion-MNIST数据集很小。</p><blockquote><p><strong>常见错误</strong> 有些同学装的是 CPU 版本的 PyTorch，跑大模型的时候会特别慢。如果你确定自己有 NVIDIA 显卡，但 <code>cuda.is_available()</code> 返回 False，建议去 PyTorch 官网重新安装对应 CUDA 版本的包。</p></blockquote><h3 id="_3-2-导入必要的库" tabindex="-1"><a class="header-anchor" href="#_3-2-导入必要的库"><span>3.2 导入必要的库</span></a></h3><p>我们把需要的库一次性导入：</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">import time</span>
<span class="line">import sys</span>
<span class="line">import torch</span>
<span class="line">from torch import nn, optim</span>
<span class="line">import torchvision</span>
<span class="line">from torchvision import transforms</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里 <code>torchvision</code> 用来加载数据集，<code>transforms</code> 用来预处理图片。</p><hr><h2 id="四、搭建-lenet-模型" tabindex="-1"><a class="header-anchor" href="#四、搭建-lenet-模型"><span>四、搭建 LeNet 模型</span></a></h2><h3 id="_4-1-定义模型类" tabindex="-1"><a class="header-anchor" href="#_4-1-定义模型类"><span>4.1 定义模型类</span></a></h3><p>我们用一个类来封装整个 LeNet：</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">device = torch.device(&#39;cuda&#39; if torch.cuda.is_available() else &#39;cpu&#39;)</span>
<span class="line"></span>
<span class="line">class LeNet(nn.Module):</span>
<span class="line">    def __init__(self):</span>
<span class="line">        super(LeNet, self).__init__()</span>
<span class="line">        self.conv = nn.Sequential(</span>
<span class="line">            nn.Conv2d(1, 6, 5),</span>
<span class="line">            nn.Sigmoid(),</span>
<span class="line">            nn.MaxPool2d(2, 2),</span>
<span class="line">            nn.Conv2d(6, 16, 5),</span>
<span class="line">            nn.Sigmoid(),</span>
<span class="line">            nn.MaxPool2d(2, 2),</span>
<span class="line">        )</span>
<span class="line">        self.fc = nn.Sequential(</span>
<span class="line">            nn.Linear(16 * 4 * 4, 120),</span>
<span class="line">            nn.Sigmoid(),</span>
<span class="line">            nn.Linear(120, 84),</span>
<span class="line">            nn.Sigmoid(),</span>
<span class="line">            nn.Linear(84, 10)</span>
<span class="line">        )</span>
<span class="line"></span>
<span class="line">    def forward(self, img):</span>
<span class="line">        feature = self.conv(img)</span>
<span class="line">        output = self.fc(feature.view(img.shape[0], -1))</span>
<span class="line">        return output</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来逐行拆解。</p><h4 id="_4-1-1-卷积层块" tabindex="-1"><a class="header-anchor" href="#_4-1-1-卷积层块"><span>4.1.1 卷积层块</span></a></h4><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">self.conv = nn.Sequential(</span>
<span class="line">    nn.Conv2d(1, 6, 5),    # 第一层卷积</span>
<span class="line">    nn.Sigmoid(),           # 激活函数</span>
<span class="line">    nn.MaxPool2d(2, 2),     # 池化</span>
<span class="line">    nn.Conv2d(6, 16, 5),    # 第二层卷积</span>
<span class="line">    nn.Sigmoid(),</span>
<span class="line">    nn.MaxPool2d(2, 2),</span>
<span class="line">)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>nn.Conv2d(1, 6, 5)</code>：输入 1 个通道（灰度图），输出 6 个通道，卷积核大小 5x5。</li><li><code>nn.Sigmoid()</code>：激活函数，把输出压缩到 0~1 之间。</li><li><code>nn.MaxPool2d(2, 2)</code>：2x2 的最大池化，步幅也是 2，特征图尺寸减半。</li></ul><p>这里有个尺寸变化的细节，我们后面会详细算。</p><h4 id="_4-1-2-全连接层块" tabindex="-1"><a class="header-anchor" href="#_4-1-2-全连接层块"><span>4.1.2 全连接层块</span></a></h4><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">self.fc = nn.Sequential(</span>
<span class="line">    nn.Linear(16 * 4 * 4, 120),</span>
<span class="line">    nn.Sigmoid(),</span>
<span class="line">    nn.Linear(120, 84),</span>
<span class="line">    nn.Sigmoid(),</span>
<span class="line">    nn.Linear(84, 10)</span>
<span class="line">)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第一层 <code>Linear</code> 的输入维度是 <code>16 * 4 * 4 = 256</code>，这是卷积层输出的特征图拉平后的长度。</li><li>中间经过 120 和 84 维的隐藏层，最后输出 10 维，对应 10 个类别。</li></ul><blockquote><p><strong>特别注意</strong> 最后一个 <code>Linear</code> 后面没有加激活函数。这是因为我们后面会用 <code>CrossEntropyLoss</code>，它内部已经包含了 Softmax 操作。如果你在这里加了 Sigmoid 或者 Softmax，反而会出问题。</p></blockquote><h4 id="_4-1-3-前向传播" tabindex="-1"><a class="header-anchor" href="#_4-1-3-前向传播"><span>4.1.3 前向传播</span></a></h4><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">def forward(self, img):</span>
<span class="line">    feature = self.conv(img)</span>
<span class="line">    output = self.fc(feature.view(img.shape[0], -1))</span>
<span class="line">    return output</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>feature.view(img.shape[0], -1)</code> 这一步很关键。卷积层的输出是一个四维张量 <code>(batch_size, 16, 4, 4)</code>，但全连接层需要二维输入 <code>(batch_size, features)</code>。<code>view</code> 的作用就是把后面三维拉平成一维，<code>-1</code> 表示让 PyTorch 自动计算这个维度的大小。</p><h3 id="_4-2-验证模型结构" tabindex="-1"><a class="header-anchor" href="#_4-2-验证模型结构"><span>4.2 验证模型结构</span></a></h3><p>定义完之后，我们实例化一下，打印看看结构：</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">net = LeNet()</span>
<span class="line">print(net)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>你应该能看到类似这样的输出：</p><div class="language-Bash line-numbers-mode" data-highlighter="prismjs" data-ext="Bash" data-title="Bash"><pre><code><span class="line">LeNet(</span>
<span class="line">  (conv): Sequential(</span>
<span class="line">    (0): Conv2d(1, 6, kernel_size=(5, 5), stride=(1, 1))</span>
<span class="line">    (1): Sigmoid()</span>
<span class="line">    (2): MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)</span>
<span class="line">    (3): Conv2d(6, 16, kernel_size=(5, 5), stride=(1, 1))</span>
<span class="line">    (4): Sigmoid()</span>
<span class="line">    (5): MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)</span>
<span class="line">  )</span>
<span class="line">  (fc): Sequential(</span>
<span class="line">    (0): Linear(in_features=256, out_features=120, bias=True)</span>
<span class="line">    (1): Sigmoid()</span>
<span class="line">    (2): Linear(in_features=120, out_features=84, bias=True)</span>
<span class="line">    (3): Sigmoid()</span>
<span class="line">    (4): Linear(in_features=84, out_features=10, bias=True)</span>
<span class="line">  )</span>
<span class="line">)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果输出跟上面差不多，说明模型定义没问题。</p><hr><h2 id="五、数据加载" tabindex="-1"><a class="header-anchor" href="#五、数据加载"><span>五、数据加载</span></a></h2><h3 id="_5-1-加载-fashion-mnist-数据集" tabindex="-1"><a class="header-anchor" href="#_5-1-加载-fashion-mnist-数据集"><span>5.1 加载 Fashion-MNIST 数据集</span></a></h3><p>我们用一个函数来封装数据加载：</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">def load_data_fashion_mnist(batch_size=256):</span>
<span class="line">    mnist_train = torchvision.datasets.FashionMNIST(</span>
<span class="line">        root=&#39;~/disks/datasets/FashionMNIST&#39;,</span>
<span class="line">        train=True,</span>
<span class="line">        download=True,</span>
<span class="line">        transform=transforms.ToTensor()</span>
<span class="line">    )</span>
<span class="line">    mnist_test = torchvision.datasets.FashionMNIST(</span>
<span class="line">        root=&#39;~/disks/Datasets/FashionMNIST&#39;,</span>
<span class="line">        train=False,</span>
<span class="line">        download=True,</span>
<span class="line">        transform=transforms.ToTensor()</span>
<span class="line">    )</span>
<span class="line"></span>
<span class="line">    if sys.platform.startswith(&#39;win&#39;):</span>
<span class="line">        num_workers = 0</span>
<span class="line">    else:</span>
<span class="line">        num_workers = 4</span>
<span class="line"></span>
<span class="line">    train_iter = torch.utils.data.DataLoader(</span>
<span class="line">        mnist_train,</span>
<span class="line">        batch_size=batch_size,</span>
<span class="line">        shuffle=True,</span>
<span class="line">        num_workers=num_workers</span>
<span class="line">    )</span>
<span class="line">    test_iter = torch.utils.data.DataLoader(</span>
<span class="line">        mnist_test,</span>
<span class="line">        batch_size=batch_size,</span>
<span class="line">        shuffle=False,</span>
<span class="line">        num_workers=num_workers</span>
<span class="line">    )</span>
<span class="line">    return train_iter, test_iter</span>
<span class="line"></span>
<span class="line">batch_size = 256</span>
<span class="line">train_iter, test_iter = load_data_fashion_mnist(batch_size)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有几个要点：</p><ul><li><code>transforms.ToTensor()</code>：把图片从 PIL Image 转成 PyTorch 的 Tensor，并且把像素值从 0~255 缩放到 0~1。</li><li><code>shuffle=True</code>：训练集需要打乱顺序，防止模型记住数据的顺序。</li><li><code>num_workers</code>：Windows 下必须设为 0，不然会报错。Linux 和 macOS 可以设成 4 或更高，加快数据加载。</li></ul><blockquote><p><strong>常见错误</strong> Windows 用户如果 <code>num_workers &gt; 0</code>，大概率会遇到 <code>BrokenPipeError</code> 或者多进程相关的报错。这个坑 PyTorch 社区讨论过很多次，目前最稳的方案就是 Windows 下设为 0。</p></blockquote><h3 id="_5-2-数据集简介" tabindex="-1"><a class="header-anchor" href="#_5-2-数据集简介"><span>5.2 数据集简介</span></a></h3><p>Fashion-MNIST 一个经典的数据集包含 10 个类别的服装图片：</p><table><thead><tr><th>标签</th><th>类别</th></tr></thead><tbody><tr><td>0</td><td>T恤/上衣</td></tr><tr><td>1</td><td>裤子</td></tr><tr><td>2</td><td>套头衫</td></tr><tr><td>3</td><td>连衣裙</td></tr><tr><td>4</td><td>外套</td></tr><tr><td>5</td><td>凉鞋</td></tr><tr><td>6</td><td>衬衫</td></tr><tr><td>7</td><td>运动鞋</td></tr><tr><td>8</td><td>包</td></tr><tr><td>9</td><td>短靴</td></tr></tbody></table><p>每张图都是 28x28 的灰度图，跟 MNIST 手写数字数据集一样的大小，但内容更复杂，更适合用来测试模型。</p><hr><h2 id="六、训练与评估" tabindex="-1"><a class="header-anchor" href="#六、训练与评估"><span>六、训练与评估</span></a></h2><h3 id="_6-1-评估函数" tabindex="-1"><a class="header-anchor" href="#_6-1-评估函数"><span>6.1 评估函数</span></a></h3><p>我们先写一个评估准确率的函数：</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">def evaluate_accuracy(data_iter, net,</span>
<span class="line">                      device=torch.device(&#39;cuda&#39; if torch.cuda.is_available() else &#39;cpu&#39;)):</span>
<span class="line">    acc_sum, n = 0.0, 0</span>
<span class="line">    with torch.no_grad():</span>
<span class="line">        for X, y in data_iter:</span>
<span class="line">            net.eval()</span>
<span class="line">            acc_sum += (net(X.to(device)).argmax(dim=1) == y.to(device)).float().sum().cpu().item()</span>
<span class="line">            net.train()</span>
<span class="line">            n += y.shape[0]</span>
<span class="line">    return acc_sum / n</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键点：</p><ul><li><code>torch.no_grad()</code>：评估阶段不需要计算梯度，可以省内存、加速。</li><li><code>net.eval()</code>：切换到评估模式，关闭 Dropout 和 BatchNorm 的随机性。</li><li><code>net.train()</code>：评估完切回训练模式，保证后续训练正常。</li></ul><blockquote><p><strong>特别注意</strong> 虽然 LeNet 本身没有 Dropout，但养成 <code>eval()</code>/<code>train()</code> 切换的习惯很重要。等你后面用更复杂的模型时，这个习惯能帮你避免很多诡异的 bug。</p></blockquote><h3 id="_6-2-训练函数" tabindex="-1"><a class="header-anchor" href="#_6-2-训练函数"><span>6.2 训练函数</span></a></h3><p>接下来是核心的训练函数：</p><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">def train(net, train_iter, test_iter, batch_size, optimizer, device, num_epochs):</span>
<span class="line">    net = net.to(device)</span>
<span class="line">    print(&#39;training on &#39;, device)</span>
<span class="line">    loss = torch.nn.CrossEntropyLoss()</span>
<span class="line">    batch_count = 0</span>
<span class="line"></span>
<span class="line">    for epoch in range(num_epochs):</span>
<span class="line">        train_l_sum, train_acc_sum, n, start = 0.0, 0.0, 0, time.time()</span>
<span class="line"></span>
<span class="line">        for X, y in train_iter:</span>
<span class="line">            X = X.to(device)</span>
<span class="line">            y = y.to(device)</span>
<span class="line"></span>
<span class="line">            y_hat = net(X)</span>
<span class="line">            l = loss(y_hat, y)</span>
<span class="line"></span>
<span class="line">            optimizer.zero_grad()</span>
<span class="line">            l.backward()</span>
<span class="line">            optimizer.step()</span>
<span class="line"></span>
<span class="line">            train_l_sum += l.cpu().item()</span>
<span class="line">            train_acc_sum += (y_hat.argmax(dim=1) == y).sum().cpu().item()</span>
<span class="line">            n += y.shape[0]</span>
<span class="line">            batch_count += 1</span>
<span class="line"></span>
<span class="line">        test_acc = evaluate_accuracy(test_iter, net)</span>
<span class="line">        print(&#39;epoch %d, loss %.4f, train acc %.3f, test acc %.3f, time %.1f sec&#39; % (</span>
<span class="line">            epoch + 1, train_l_sum / batch_count, train_acc_sum / n, test_acc, time.time() - start))</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>训练流程的每一步：</p><ol><li><strong>数据移到 GPU</strong>：<code>X.to(device)</code> 和 <code>y.to(device)</code></li><li><strong>前向传播</strong>：<code>y_hat = net(X)</code>，得到预测结果</li><li><strong>计算损失</strong>：<code>l = loss(y_hat, y)</code>，这里我们选择的是<strong>交叉熵</strong>比较预测和真实标签</li><li><strong>清空梯度</strong>：<code>optimizer.zero_grad()</code>，防止梯度累加</li><li><strong>反向传播</strong>：<code>l.backward()</code>，计算每个参数的梯度</li><li><strong>更新参数</strong>：<code>optimizer.step()</code>，用梯度下降更新权重</li></ol><p>这个六步流程，是 PyTorch 训练的万能模板。理解了这六步，你后面跑任何模型都是这个套路。</p><h3 id="_6-3-启动训练" tabindex="-1"><a class="header-anchor" href="#_6-3-启动训练"><span>6.3 启动训练</span></a></h3><div class="language-Python line-numbers-mode" data-highlighter="prismjs" data-ext="Python" data-title="Python"><pre><code><span class="line">lr, num_epochs = 0.001, 5</span>
<span class="line">optimizer = torch.optim.Adam(net.parameters(), lr=lr)</span>
<span class="line">train(net, train_iter, test_iter, batch_size, optimizer, device, num_epochs)</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>学习率 <code>0.001</code>，Adam 优化器，这是比较稳妥的默认配置。</li><li>训练 5 个 epoch，在 GPU 上大概十几秒就能跑完。</li></ul><p>预期输出：</p><div class="language-Bash line-numbers-mode" data-highlighter="prismjs" data-ext="Bash" data-title="Bash"><pre><code><span class="line">training on  cuda</span>
<span class="line">epoch 1, loss 1.8146, train acc 0.338, test acc 0.579, time 2.1 sec</span>
<span class="line">epoch 2, loss 0.4753, train acc 0.631, test acc 0.673, time 1.7 sec</span>
<span class="line">epoch 3, loss 0.2591, train acc 0.709, test acc 0.706, time 1.8 sec</span>
<span class="line">epoch 4, loss 0.1748, train acc 0.732, test acc 0.734, time 1.7 sec</span>
<span class="line">epoch 5, loss 0.1291, train acc 0.748, test acc 0.744, time 1.7 sec</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5 个 epoch 下来，我测试的准确率大概在 74% 左右。这个成绩不算高，但考虑到 LeNet 是 1998 年的架构，而且我们只有 5 个 epoch，这个表现已经不错了。</p><hr><h2 id="七、尺寸变化详解" tabindex="-1"><a class="header-anchor" href="#七、尺寸变化详解"><span>七、尺寸变化详解</span></a></h2><p>很多同学对卷积和池化后的尺寸变化感到困惑，我们可以手动来算一遍。</p><p>假设输入是 <code>(batch_size, 1, 28, 28)</code>：</p><table><thead><tr><th>层</th><th>操作</th><th>输出尺寸</th></tr></thead><tbody><tr><td>输入</td><td>-</td><td>(N, 1, 28, 28)</td></tr><tr><td>卷积 1</td><td>Conv2d(1,6,5), 无 padding</td><td>(N, 6, 24, 24)</td></tr><tr><td>池化 1</td><td>MaxPool2d(2,2)</td><td>(N, 6, 12, 12)</td></tr><tr><td>卷积 2</td><td>Conv2d(6,16,5), 无 padding</td><td>(N, 16, 8, 8)</td></tr><tr><td>池化 2</td><td>MaxPool2d(2,2)</td><td>(N, 16, 4, 4)</td></tr><tr><td>拉平</td><td>view(N, -1)</td><td>(N, 256)</td></tr><tr><td>全连接 1</td><td>Linear(256, 120)</td><td>(N, 120)</td></tr><tr><td>全连接 2</td><td>Linear(120, 84)</td><td>(N, 84)</td></tr><tr><td>全连接 3</td><td>Linear(84, 10)</td><td>(N, 10)</td></tr></tbody></table><p>卷积后的尺寸计算公式：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">输出尺寸 = 输入尺寸 - 卷积核大小 + 1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>因为没有 padding，所以每经过一次 5x5 卷积，宽高都减少 4。</p><p>池化后的尺寸计算：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">输出尺寸 = 输入尺寸 / 池化核大小</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2x2 池化，步幅 2，所以宽高直接减半。</p><blockquote><p><strong>特别注意</strong> 如果你的输入尺寸不是 28x28，上面的计算就不成立了。比如你用 32x32 的输入，卷积后的尺寸会不一样，全连接层的输入维度也需要跟着改。这是很多新手容易踩的坑。</p></blockquote><hr><h2 id="八、总结与延伸" tabindex="-1"><a class="header-anchor" href="#八、总结与延伸"><span>八、总结与延伸</span></a></h2><h3 id="_8-1-本文回顾" tabindex="-1"><a class="header-anchor" href="#_8-1-本文回顾"><span>8.1 本文回顾</span></a></h3><p>我们跟着代码，完成了以下内容：</p><ol><li>理解了 LeNet 的整体架构（卷积层 + 全连接层）</li><li>用 PyTorch 的 <code>nn.Sequential</code> 类搭建了模型</li><li>加载了 Fashion-MNIST 数据集</li><li>实现了训练和评估的完整流程</li><li>手动推导了每一层的尺寸变化</li></ol><h3 id="_8-2-可以继续尝试的" tabindex="-1"><a class="header-anchor" href="#_8-2-可以继续尝试的"><span>8.2 可以继续尝试的</span></a></h3><ul><li><strong>增加 epoch 数</strong>：5 个 epoch 明显不够，试试 20 个或 50 个，看看准确率能到多少。</li><li><strong>换激活函数</strong>：把 Sigmoid 换成 ReLU，通常会有明显提升。</li><li><strong>加 BatchNorm</strong>：在卷积层后面加 <code>nn.BatchNorm2d</code>，可以加速收敛。</li><li><strong>换优化器</strong>：试试 SGD + Momentum，跟 Adam 对比一下效果。</li><li><strong>可视化特征图</strong>：把中间层的特征图画出来，看看模型到底「看」到了什么。</li></ul><h3 id="_8-3-下一步学习扩展" tabindex="-1"><a class="header-anchor" href="#_8-3-下一步学习扩展"><span>8.3 下一步学习扩展</span></a></h3><p>LeNet 是 CNN 的起点。建议下一步：</p><ul><li><strong>AlexNet</strong>（2012）：更深的网络，ReLU + Dropout，ImageNet 冠军</li><li><strong>VGGNet</strong>（2014）：小卷积核（3x3）堆叠，结构非常规整</li><li><strong>ResNet</strong>（2015）：残差连接，解决了深层网络的梯度消失问题</li></ul><p>这些模型都是 LeNet 思想的延伸，理解了 LeNet，再看它们会轻松很多。</p><hr><p>如果你在跟着本文实操的过程中遇到了问题，欢迎联系我，下方有我邮箱和GitHub。我会尽量回复。</p><p>我们下篇文章见。 作者：/剑桥折刀</p>`,108)])])}const c=s(l,[["render",d]]),p=JSON.parse('{"path":"/blogs/conglingkaishishoucuoLeNet：yong PyTorch dajiannidediyigejuanjishenjingwangluo.html","title":"从零开始手搓LeNet：用 PyTorch 搭建你的第一个卷积神经网络","lang":"zh-CN","frontmatter":{"title":"从零开始手搓LeNet：用 PyTorch 搭建你的第一个卷积神经网络","date":"2026-05-20T00:00:00.000Z","categories":["深度学习","计算机视觉"],"tags":["PyTorch","LeNet","CNN","卷积神经网络"],"author":"剑桥折刀"},"headers":[{"level":2,"title":"一、前言：为什么先从 LeNet 开始？","slug":"一、前言-为什么先从-lenet-开始","link":"#一、前言-为什么先从-lenet-开始","children":[]},{"level":2,"title":"二、LeNet 的架构概览","slug":"二、lenet-的架构概览","link":"#二、lenet-的架构概览","children":[]},{"level":2,"title":"三、环境准备","slug":"三、环境准备","link":"#三、环境准备","children":[{"level":3,"title":"3.1 确认 PyTorch 环境","slug":"_3-1-确认-pytorch-环境","link":"#_3-1-确认-pytorch-环境","children":[]},{"level":3,"title":"3.2 导入必要的库","slug":"_3-2-导入必要的库","link":"#_3-2-导入必要的库","children":[]}]},{"level":2,"title":"四、搭建 LeNet 模型","slug":"四、搭建-lenet-模型","link":"#四、搭建-lenet-模型","children":[{"level":3,"title":"4.1 定义模型类","slug":"_4-1-定义模型类","link":"#_4-1-定义模型类","children":[]},{"level":3,"title":"4.2 验证模型结构","slug":"_4-2-验证模型结构","link":"#_4-2-验证模型结构","children":[]}]},{"level":2,"title":"五、数据加载","slug":"五、数据加载","link":"#五、数据加载","children":[{"level":3,"title":"5.1 加载 Fashion-MNIST 数据集","slug":"_5-1-加载-fashion-mnist-数据集","link":"#_5-1-加载-fashion-mnist-数据集","children":[]},{"level":3,"title":"5.2 数据集简介","slug":"_5-2-数据集简介","link":"#_5-2-数据集简介","children":[]}]},{"level":2,"title":"六、训练与评估","slug":"六、训练与评估","link":"#六、训练与评估","children":[{"level":3,"title":"6.1 评估函数","slug":"_6-1-评估函数","link":"#_6-1-评估函数","children":[]},{"level":3,"title":"6.2 训练函数","slug":"_6-2-训练函数","link":"#_6-2-训练函数","children":[]},{"level":3,"title":"6.3 启动训练","slug":"_6-3-启动训练","link":"#_6-3-启动训练","children":[]}]},{"level":2,"title":"七、尺寸变化详解","slug":"七、尺寸变化详解","link":"#七、尺寸变化详解","children":[]},{"level":2,"title":"八、总结与延伸","slug":"八、总结与延伸","link":"#八、总结与延伸","children":[{"level":3,"title":"8.1 本文回顾","slug":"_8-1-本文回顾","link":"#_8-1-本文回顾","children":[]},{"level":3,"title":"8.2 可以继续尝试的","slug":"_8-2-可以继续尝试的","link":"#_8-2-可以继续尝试的","children":[]},{"level":3,"title":"8.3 下一步学习扩展","slug":"_8-3-下一步学习扩展","link":"#_8-3-下一步学习扩展","children":[]}]}],"git":{"createdTime":1779239243000,"updatedTime":1779239243000,"contributors":[{"name":"剑桥折刀","email":"3144253125@qq.com","commits":1}]},"filePathRelative":"blogs/从零开始手搓LeNet：用 PyTorch 搭建你的第一个卷积神经网络.md"}');export{c as comp,p as data};
