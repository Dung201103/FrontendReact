import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { useState } from 'react';
import { IoIosClose, IoIosCheckmark } from 'react-icons/io';
const Question = (props) => {
    const { data, index, isShowAnswer } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }
    const handleCheckbox = (event, aId, qId) => {

        props.handleCheckbox(aId, qId)
    }
    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64,${data.image}`} />
                    {isPreviewImage === true &&
                        <Lightbox image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}
                        ></Lightbox>
                    }
                </div>
                :
                <div className='q-image'>

                </div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription} ?</div>
            <div className="answer">
                {data.answers && data.answers && data.answers.map((a, i) => {
                    return (
                        <div key={`answers-${i}`} className="a-child">
                            <div className="form-check">
                                <input className="form-check-input"
                                    id={`check-${i}-${index}`}
                                    type="checkbox"
                                    checked={a.isSelected}
                                    disabled={props.isSubmitQuiz}
                                    onChange={(event) => handleCheckbox(event, a.id, data.questionId)} />
                                <label className="form-check-label" htmlFor={`check-${i}-${index}`}>
                                    {a.description}
                                </label>
                                {isShowAnswer === true &&
                                    <>
                                        {a.isSelected === true && a.isCorrect === false
                                            && <IoIosClose className='incorrect' />
                                        }
                                        {a.isCorrect === true
                                            && <IoIosCheckmark className='correct' />
                                        }
                                    </>

                                }
                            </div>


                        </div>
                    )
                })}


            </div>
        </>
    )
}
export default Question;