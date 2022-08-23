import React from 'react';
import { useTitle } from '../util';
import Container from './Container';

const Profile: React.FC = () => {
    useTitle('Profile');

    return (
        <Container>
            <div className='mt-6 prose prose-stone prose-h2:mt-4 prose-h1:text-gray-700 prose-h2:text-gray-600 prose-headings:font-serif max-w-prose mx-auto'>
                <h1>Profile</h1>
                <article>
                    <header className='border-b border-b-gray-400 flex flex-row items-baseline'>
                        <h2>
                            Quantitative Risk Management
                        </h2>
                        <span className='ml-auto'>January 2012-Present</span>
                    </header>
                    <main>
                        <ul>
                            <li><strong>Primary architect and developer</strong> for the Client Library, a SharePoint-based documentation and publishing system
                                <ul>
                                    <li>Designed and implemented an extensively customized SharePoint solution to replace an existing
                                        RoboHelp-based documentation system.</li>
                                    <li>Implemented an HTML syntax parser based on the Microsoft "Roslyn" architecture, which enabled the
                                        addition of custom link, code snippet, and equation syntax, as well as a suite of tools to lint and
                                        improve the quality of HTML sourced from the SharePoint WYSIWYG editor.
                                    </li>
                                    <li>Implemented a custom cross-farm publishing solution using .NET Framework and SQL Server to rapidly
                                        publish content to clients.
                                    </li>
                                    <li>Implemented a custom quarterly publishing system which allows users to browser and publish content
                                        for any release of QRM's Analytical Framework software, and to synchronize cross-cutting changes
                                        from release to release.
                                    </li>
                                    <li>Implemented a custom client-side UI framework for providing real-time filtering and sorting
                                        capabilities for thousands of pages of Client Library content.
                                    </li>
                                </ul>
                            </li>
                            <li><strong>Primary architect and developer</strong> for the QRM Conference managment system
                                <ul>
                                    <li>Iterated and improved legacy architecture for a SharePoint-based conference registration and
                                        management system, enabling the company to deliver two successful conferences per year for
                                        over nine years.
                                    </li>
                                    <li>During the COVID-19 pandemic, implemented a virtual registration and delivery system including
                                        a new React-based registration experience and integration with WebEx in approximately eight weeks.
                                    </li>
                                    <li>Further improved the system to deliver a hybrid conference experience in less than two months.
                                    </li>
                                </ul>
                            </li>
                            <li><strong>Primary architect and developer</strong> for the QRM Education management system
                                <ul>
                                    <li>Reengineered legacy architecture for a SharePoint-based education registration and management
                                        system, leading the ongoing successful delivery of over one hundred in-person and virtual
                                        education sessions per year.
                                    </li>
                                    <li>During the COVID-19 pandemic, leverage existing investments in WebEx integration to enable the
                                        rapid configuration and delivery of virtual WebEx-based sessions.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </main>
                </article>
                <article>
                    <header className='border-b border-b-gray-400 flex flex-row items-baseline'>
                        <h2>
                            Aviva USA
                        </h2>
                        <span className='ml-auto'>June 2009-October 2011</span>
                    </header>
                    <main>
                        <h3>SharePoint Developer</h3>
                    </main>
                </article>
                <article>
                    <header className='border-b border-b-gray-400 flex flex-row items-baseline'>
                        <h2>
                            Sogeti USA
                        </h2>
                        <span className='ml-auto'>January 2007-June 2009</span>
                    </header>
                    <main>
                        <h3>Senior Consultant <span className='text-base'>(December 2008-June 2009)</span></h3>
                        <h3>Consultant <span className='text-base'>(January 2007-December 2008)</span></h3>
                    </main>
                </article>
            </div>
        </Container>
    )
}

export default Profile;