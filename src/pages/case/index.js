/**
 * Created by axetroy on 17-4-6.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Spin, Tooltip, Icon, Col, Row, Card } from 'antd';
import Lightbox from 'react-image-lightbox';
import LazyLoad from 'react-lazyload';
import github from '../../lib/github';

import DocumentTitle from '../../component/document-title';
import ViewSourceCode from '../../component/view-source-code';

function img(name) {
  return `img/showcase/${name}`;
}

class Case extends Component {
  state = {
    shouldRend: false,
    lightboxImages: [],
    photoIndex: 0,
    isOpen: false,

    done: [
      {
        name: '个人博客',
        desc: (
          <div>
            <p>技术架构: React全家桶 + Webpack</p>
            <p>博客从最初的wordpress，再到hexo，然后到现在自己写的react实现。总要有个地方记录些什么东西...</p>
          </div>
        ),
        screenshot: [1, 2, 3].map(i => img(`blog-${i}.png`)),
        homepage: `https://axetroy.github.io`
      },
      {
        name: '中菁商城',
        desc: (
          <div>
            <p>技术架构: Angular1.x + Gulp + Webpack</p>
            <p>以生物产品为主导的在线P2P商城，提供生物/基因产品和技术服务.</p>
          </div>
        ),
        screenshot: '',
        homepage: ``
      },
      {
        name: '光彩钱包',
        desc: (
          <div>
            <p>技术架构: Angular1.x + Gulp + Webpack</p>
            <p>虚拟币钱包，管理虚拟币的运营/走向和资金流动</p>
          </div>
        ),
        screenshot: [1].map(i => img(`gcb-wallet-${i}.png`)),
        homepage: ``
      },
      {
        name: '光彩交易平台',
        desc: (
          <div>
            <p>技术架构: Angular1.x + Gulp + Webpack</p>
            <p>以虚拟币为主导的流通/投资平台</p>
          </div>
        ),
        screenshot: [1, 2, 3].map(i => img(`gcb-${i}.png`)),
        homepage: `http://gloriouspay.com/`
      },
      {
        name: 'K币交易平台',
        desc: (
          <div>
            <p>技术架构: Angular1.x + Gulp + Webpack</p>
            <p>以虚拟币为主导的流通/投资平台</p>
          </div>
        ),
        screenshot: [1, 2].map(i => img(`kcoin-${i}.png`)),
        homepage: `http://kcoin.biz`
      },
      {
        name: '象宝交易平台',
        desc: (
          <div>
            <p>技术架构: Angular1.x + Gulp + Webpack</p>
            <p>以虚拟币为主导的流通/投资平台</p>
          </div>
        ),
        screenshot: [1].map(i => img(`kongbow-${i}.png`)),
        homepage: `http://kongbow.com/`
      },
      {
        name: 'DOB交易平台',
        desc: (
          <div>
            <p>技术架构: Angular1.x + Gulp + Webpack</p>
            <p>以虚拟币为主导的流通/投资平台</p>
          </div>
        ),
        screenshot: [1, 2, 3].map(i => img(`dob-${i}.png`)),
        homepage: `http://www.db63.com/`
      },
      {
        name: '全球币交易平台',
        desc: (
          <div>
            <p>技术架构: Angular1.x + Gulp + Webpack</p>
            <p>以虚拟币为主导的流通/投资平台</p>
          </div>
        ),
        screenshot: [1, 2].map(i => img(`woqi-${i}.png`)),
        homepage: ``
      },
      {
        name: 'KAO好吃后台管理',
        desc: (
          <div>
            <p>技术架构: thinkPHP + requireJS</p>
            <p>KAO好吃微信公众号后台管理</p>
          </div>
        ),
        screenshot: [1, 2, 3].map(i => img(`kaopu-${i}.png`)),
        homepage: `http://cy.hydhmy.com/hyc/m/per.html`
      },
      {
        name: 'KAO好吃微信小程序',
        desc: (
          <div>
            <p>技术架构: Wepy</p>
            <p>一个实体店点餐/外卖的小程序.</p>
          </div>
        ),
        screenshot: [1, 2, 3].map(i => img(`wxapp-kaopu-${i}.png`)),
        homepage: ``
      }
    ],
    undone: [
      {
        name: '虚拟币交易平台v3',
        desc: (
          <div>
            <p>技术架构: Angular2.x + Typescript + Webpack</p>
            <p>名字待定，乃虚拟币交易平台第三版.</p>
          </div>
        ),
        screenshot: '',
        homepage: ``
      },
      {
        name: '旅游向导类微信小程序',
        desc: (
          <div>
            <p>技术架构: Labarador</p>
            <p>类似嗨牛旅行</p>
          </div>
        ),
        screenshot: [1, 2].map(i => img(`tuanjian-${i}.png`)),
        homepage: ``
      },
      {
        name: 'OA系统APP',
        desc: (
          <div>
            <p>技术架构: 安卓/IOS原生嵌套webview，web使用react + Webpack</p>
            <p>办公类的app，主体是android java和ios object-c. 部分内容嵌套webview</p>
          </div>
        ),
        screenshot: '',
        homepage: ``
      }
    ]
  };

  async componentWillMount() {
    // get case
    try {
      const res = await github.get(`/repos/axetroy/showcase/issues`);
      const data = res.data || [];
      data.map(d => {
        const body = d.body;

        const lines = body.split('\n');

        let descriptionStartLineNumber = -1;
        let descriptionEndLineNumber = -1;
        let galleryStartLineNumber = -1;
        let galleryEndLineNumber = -1;

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].trim();
          console.log(i, line);
          if (line.indexOf(`<!-- description-start -->`) >= 0) {
            descriptionStartLineNumber = i + 1;
          } else if (line.indexOf(`<!-- description-end -->`) >= 0) {
            descriptionEndLineNumber = i - 1;
          } else if (line.indexOf(`<!-- gallery-start -->`) >= 0) {
            galleryStartLineNumber = i + 1;
          } else if (line.indexOf(`<!-- gallery-end -->`) >= 0) {
            galleryEndLineNumber = i - 1;
          }
        }

        const description = [];
        const gallery = [];

        body.split('\n').forEach((line, i) => {
          if (
            i >= descriptionStartLineNumber &&
            i <= descriptionEndLineNumber
          ) {
            description.push(line);
          } else if (i >= galleryStartLineNumber && i <= galleryEndLineNumber) {
            gallery.push(line);
          }
        });

        console.info(description.join('\n'));
        console.info(gallery.join('\n'));

        gallery.map(line => {
          const match = line.match(/\[(\w+)\]\(([^\)]+)\)/gim);
          console.log(match);
        });
      });
      this.setState({ showcases: data });
    } catch (err) {}

    this.setState({ shouldRend: true });
  }

  rendCase(title, cases) {
    const noScreenshotImg = 'img/no-img.jpg';
    return (
      <LazyLoad height={300} offset={100}>
        <div>
          <h2 style={{ textAlign: 'center' }}>{title}</h2>
          <Row gutter={16}>
            {cases.map(c => {
              return (
                <Col md={8} xs={24} key={c.name} style={{ margin: '1rem 0' }}>
                  <Card>
                    <div
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '30rem'
                      }}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${c.screenshot &&
                          c.screenshot.length
                            ? c.screenshot[0]
                            : noScreenshotImg})`,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundAttachment: 'interit',
                          verticalAlign: 'middle',
                          width: '100%',
                          height: '30rem'
                        }}
                        onClick={() =>
                          this.setState({
                            isOpen: true,
                            photoIndex: 0,
                            lightboxImages:
                              c.screenshot && c.screenshot.length
                                ? c.screenshot
                                : [noScreenshotImg]
                          })}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          backgroundColor: '#FAFAFA',
                          padding: '1rem',
                          width: '100%'
                        }}
                      >
                        <h3>
                          {c.homepage ? (
                            <a href={c.homepage} target="_blank">
                              {c.name}
                            </a>
                          ) : (
                            c.name
                          )}
                        </h3>
                        <div>{c.desc}</div>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </LazyLoad>
    );
  }

  render() {
    let images = ['blog-1.png', 'blog-2.png', 'blog-3.png'].map(v => img(v));
    const { photoIndex, isOpen, lightboxImages, shouldRend } = this.state;
    return shouldRend ? (
      <DocumentTitle title={['案例展示']}>
        <Spin spinning={false}>
          <div className="toolbar-container">
            <div className="edit-this-page">
              <Tooltip placement="topLeft" title="查看源码" arrowPointAtCenter>
                <ViewSourceCode file="pages/case/index.js">
                  <a href="javascript: void 0" target="_blank">
                    <Icon
                      type="code"
                      style={{
                        fontSize: '3rem'
                      }}
                    />
                  </a>
                </ViewSourceCode>
              </Tooltip>
            </div>
            {this.rendCase('顺产项目', this.state.done)}
            {this.rendCase('难产项目', this.state.undone)}
            {isOpen ? (
              <Lightbox
                mainSrc={lightboxImages[photoIndex]}
                nextSrc={
                  lightboxImages[(photoIndex + 1) % lightboxImages.length]
                }
                prevSrc={
                  lightboxImages[
                    (photoIndex + images.length - 1) % lightboxImages.length
                  ]
                }
                onCloseRequest={() =>
                  this.setState({ isOpen: false, photoIndex: 0 })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex:
                      (photoIndex + lightboxImages.length - 1) %
                      lightboxImages.length
                  })}
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % lightboxImages.length
                  })}
              />
            ) : null}
          </div>
        </Spin>
      </DocumentTitle>
    ) : (
      <div />
    );
  }
}
export default connect(
  function mapStateToProps(state) {
    return {};
  },
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
  }
)(withRouter(Case));
