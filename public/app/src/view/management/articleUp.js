import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { ContentUtils } from 'braft-utils'
import axios from '../../utils/axios'
class articleUp extends Component {
    state = {
        editorState: null,
        title: ""
    }
    async componentDidMount() {

    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容

    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    quitText = () => {
        //清空
        this.setState({
            editorState: ContentUtils.clear(this.state.editorState)
        })
    }
    submit = () => {
        axios.post('/api/management/push', {
            title: this.state.title,
            html: this.state.editorState.toHTML()
        }).then(res => {
            if (res.code === 200) {
                message.success(res.msg);
            } else {
                message.error(res.msg);
            }
        })
    }
    titleChange = e => {
        this.setState({
            title: e.target.value
        })
    }
    render() {
        const { editorState } = this.state
        return (
            <div className="c-box">
                <div className="articleup-title">
                    <Input size="large" onChange={this.titleChange} value={this.state.title} placeholder="请输入标题" />
                </div>
                <div>
                    <BraftEditor
                        value={editorState}
                        onChange={this.handleEditorChange}
                        onSave={this.submitContent}
                    />
                </div>
                <div className="articleup-btns">
                    <Button type="primary" onClick={this.submit}>发布</Button>
                    <Button className="m-l" onClick={this.quitText}>取消</Button>
                </div>
            </div>
        );
    }
}

export default articleUp;