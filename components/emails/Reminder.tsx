
import { config } from "@/lib/config"
import { Body, Button, Container, Head, Html, Img, Preview, Section, Tailwind, Text } from "@react-email/components"


export function Reminder({
    fullName,
    active
}: {
    fullName: string,
    active: boolean
}) {

    const previewText = active ? `We are happy to see you active, ${fullName}!` : `We miss you, ${fullName}!`

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="my-10 mx-auto p-5 w-[465px]">
                        <Section className="mt-8">
                            <Img
                                src={`${config.env.prodApiEndpoint}/icons/logo.svg`}
                                width="80"
                                height="80"
                                alt="Logo"
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Text className="text-sm">
                            Hello {fullName},
                        </Text>
                        <Text className="text-sm">

                            {active ? `We are happy to see you active on BookWise! Keep reading! ` : `Hello ${fullName}, we miss you! Please come back to BookWise! There are new books waiting for you! `} We hope you enjoy your journey with us. If you have any questions or need assistance, feel free to reach out.
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#00A3FF] rounded text-white text-xs font-semibold no-underline text-center py-3 px-5 "
                                href={`${config.env.prodApiEndpoint}`}
                            >
                                Let&apos;s Go
                            </Button>
                        </Section>
                        <Text className="text-sm">
                            Cheers,
                            <br />
                            The <strong>BookWise</strong> Team
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
