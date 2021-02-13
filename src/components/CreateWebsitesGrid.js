import React, {useState} from 'react';
import CreateSection from './CreateSection';
import { Modal, Button, Container } from 'semantic-ui-react';

//PROPS: a complete array of "websites", an array of unique sections
const CreateWebsitesGrid = (props) => {

    const websites = props.websites;
    const uniqueSections = props.uniqueSections;

    const result = [];

    //create the Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalName, setModalName] = useState("");
    const [modalDescription, setModalDescription] = useState("");

    const openModalFunction = (websiteName, websiteDescription) => {
        setModalName(websiteName);
        setModalDescription(websiteDescription);
        setModalOpen(true);
    }
    const websiteModal = (
        <Container>
            <Modal
                onClose={() => setModalOpen(false)}
                onOpen={() => setModalOpen(true)}
                open={modalOpen}
            >
            <Modal.Header>
                {modalName}
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {modalDescription}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setModalOpen(false)}>
                    Close Modal
                </Button>
            </Modal.Actions>
            </Modal>
        </Container>
    );
    result.push(websiteModal);


    //an array of "createSections"
    for (var i = 0; i < uniqueSections.length; i++) {
        const sectionName = uniqueSections[i];
        const sectionWebsites = websites.filter((website) => website.category.includes(sectionName));
        //note: make the key the same as the section name, since each section name is unique
        const singleSection = (
            <CreateSection sectionName={sectionName} websites={sectionWebsites} 
                            openModalFunction={openModalFunction} key={sectionName}></CreateSection>
        );
        result.push(singleSection);
    }

    return result;
}
 
export default CreateWebsitesGrid;