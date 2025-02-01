import { config } from "@/lib/config"
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from "@react-email/components"

type Props = {
    fullName: string,
}

export function Welcome({
    fullName,
}: Props) {

    const previewText = `Welcome to BookWise, ${fullName}!`

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
                        <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
                            Welcome to <strong>BookWise</strong>, {fullName}!
                        </Heading>
                        <Text className="text-sm">
                            Hello {fullName},
                        </Text>
                        <Text className="text-sm">
                            We're excited to have you onboard at <strong>BookWise</strong>. We hope you enjoy your journey with us. If you have any questions or need assistance, feel free to reach out.
                        </Text>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#00A3FF] rounded text-white text-xs font-semibold no-underline text-center py-3 px-5 "
                                href={`${config.env.prodApiEndpoint}`}
                            >
                                Get Started
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
